'use client';

import { useState } from 'react';
import { Copy, Check, Mail, MessageSquare, Phone } from 'lucide-react';
import { ApologyVariant, ApologyContent as ApologyContentType } from '@/data/situations';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ApologyContentProps {
  apology: ApologyVariant;
  method: string;
}

export function ApologyContent({ apology, method }: ApologyContentProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const CopyButton = ({ text, section }: { text: string; section: string }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => handleCopy(text, section)}
      className={cn(
        'h-8 gap-1.5 text-xs transition-all',
        copiedSection === section
          ? 'bg-green-50 border-green-200 text-green-700'
          : 'hover:bg-zinc-50'
      )}
    >
      {copiedSection === section ? (
        <>
          <Check className="h-3.5 w-3.5" />
          コピー完了
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          コピー
        </>
      )}
    </Button>
  );

  if (method === 'email') {
    return (
      <div className="space-y-6">
        {apology.content.subjects && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-900" />
              <h4 className="font-medium text-blue-900">件名案</h4>
            </div>
            <div className="space-y-2">
              {apology.content.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 p-3 bg-zinc-50 rounded-lg border border-zinc-100"
                >
                  <span className="text-sm text-zinc-700 font-mono">{subject}</span>
                  <CopyButton text={subject} section={`subject-${index}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-blue-900">本文</h4>
            <CopyButton text={apology.content.body} section="body" />
          </div>
          <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
            <pre className="text-sm text-zinc-700 whitespace-pre-wrap font-sans leading-relaxed">
              {apology.content.body}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  if (method === 'chat') {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-900" />
              <h4 className="font-medium text-blue-900">メッセージ</h4>
            </div>
            <CopyButton text={apology.content.body} section="chat-body" />
          </div>
          <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
            <pre className="text-sm text-zinc-700 whitespace-pre-wrap font-sans leading-relaxed">
              {apology.content.body}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  if (method === 'phone') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="h-4 w-4 text-blue-900" />
          <h4 className="font-medium text-blue-900">電話台本</h4>
        </div>

        {apology.content.opening && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-900 text-white text-xs font-bold">
                  1
                </span>
                <h5 className="font-medium text-blue-900">第一声</h5>
              </div>
              <CopyButton text={apology.content.opening} section="opening" />
            </div>
            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 ml-8">
              <p className="text-sm text-zinc-700">{apology.content.opening}</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-900 text-white text-xs font-bold">
                2
              </span>
              <h5 className="font-medium text-blue-900">本題</h5>
            </div>
            <CopyButton text={apology.content.body} section="phone-body" />
          </div>
          <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 ml-8">
            <pre className="text-sm text-zinc-700 whitespace-pre-wrap font-sans leading-relaxed">
              {apology.content.body}
            </pre>
          </div>
        </div>

        {apology.content.closing && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-900 text-white text-xs font-bold">
                  3
                </span>
                <h5 className="font-medium text-blue-900">クロージング</h5>
              </div>
              <CopyButton text={apology.content.closing} section="closing" />
            </div>
            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 ml-8">
              <p className="text-sm text-zinc-700">{apology.content.closing}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
