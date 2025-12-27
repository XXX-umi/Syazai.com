'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  UserCircle,
  Users,
  Heart,
  Mail,
  MessageSquare,
  Phone,
  AlertCircle,
} from 'lucide-react';
import {
  getSituationBySlug,
  getApologyContent,
  RecipientType,
  MethodType,
  ExcuseType,
  Situation,
} from '@/data/situations';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ApologyContent } from '@/components/apology/ApologyContent';
import { Checklist } from '@/components/apology/Checklist';
import { SolutionCards } from '@/components/apology/SolutionCards';
import { ExcuseOptions } from '@/components/apology/ExcuseOptions';

const recipientOptions: { value: RecipientType; label: string; icon: React.ElementType }[] = [
  { value: 'client', label: '取引先', icon: Building2 },
  { value: 'boss', label: '上司', icon: UserCircle },
  { value: 'customer', label: '顧客', icon: Users },
  { value: 'friend', label: '友人', icon: Heart },
];

const methodOptions: { value: MethodType; label: string; icon: React.ElementType }[] = [
  { value: 'email', label: 'メール', icon: Mail },
  { value: 'chat', label: 'チャット', icon: MessageSquare },
  { value: 'phone', label: '電話台本', icon: Phone },
];

const severityConfig = {
  low: { label: '軽度', color: 'bg-green-100 text-green-700' },
  medium: { label: '中度', color: 'bg-yellow-100 text-yellow-700' },
  high: { label: '重度', color: 'bg-red-100 text-red-700' },
};

export default function SituationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [situation, setSituation] = useState<Situation | null>(null);
  const [recipient, setRecipient] = useState<RecipientType>('client');
  const [method, setMethod] = useState<MethodType>('email');
  const [excuse, setExcuse] = useState<ExcuseType>('none');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getSituationBySlug(slug);
    if (data) {
      setSituation(data);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-pulse text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (!situation) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-2 text-zinc-600 hover:text-blue-900">
              <ArrowLeft className="h-5 w-5" />
              <span>トップに戻る</span>
            </Link>
          </div>
        </header>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <AlertCircle className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-zinc-900 mb-2">ページが見つかりません</h1>
          <p className="text-zinc-500 mb-6">指定されたシチュエーションは存在しません。</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            トップに戻る
          </Link>
        </div>
      </div>
    );
  }

  const currentApology = getApologyContent(situation, recipient, method, excuse);
  const severity = severityConfig[situation.severity];

  const availableExcuses = situation.apologies
    .filter((a) => a.recipient === recipient && a.method === method && a.excuseVariants)
    .flatMap((a) => Object.keys(a.excuseVariants || {}) as ExcuseType[]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-zinc-600 hover:text-blue-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">戻る</span>
            </Link>
            <div className="h-6 w-px bg-zinc-200" />
            <Link href="/" className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-blue-900" />
              <span className="font-bold text-blue-900">Syazai.com</span>
            </Link>
          </div>
          <Badge className={severity.color}>{severity.label}</Badge>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">{situation.title}</h1>
          <p className="text-zinc-600">{situation.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
              <div className="p-4 border-b border-zinc-100 bg-blue-50">
                <h2 className="font-semibold text-blue-900 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  謝罪生成コックピット
                </h2>
              </div>

              <div className="p-4 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-blue-900 mb-3">謝罪の相手</h3>
                  <Tabs value={recipient} onValueChange={(v) => setRecipient(v as RecipientType)}>
                    <TabsList className="grid grid-cols-4 w-full bg-zinc-100 p-1">
                      {recipientOptions.map(({ value, label, icon: Icon }) => (
                        <TabsTrigger
                          key={value}
                          value={value}
                          className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-blue-900 data-[state=active]:text-white data-[state=active]:shadow-sm"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="hidden sm:inline">{label}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-blue-900 mb-3">送信手段</h3>
                  <Tabs value={method} onValueChange={(v) => setMethod(v as MethodType)}>
                    <TabsList className="grid grid-cols-3 w-full bg-zinc-100 p-1">
                      {methodOptions.map(({ value, label, icon: Icon }) => (
                        <TabsTrigger
                          key={value}
                          value={value}
                          className="flex items-center gap-1.5 data-[state=active]:bg-blue-900 data-[state=active]:text-white data-[state=active]:shadow-sm"
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                {availableExcuses.length > 0 && (
                  <ExcuseOptions
                    selectedExcuse={excuse}
                    onExcuseChange={setExcuse}
                    availableExcuses={availableExcuses}
                  />
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
              <div className="p-4 border-b border-zinc-100 bg-blue-50">
                <h2 className="font-semibold text-blue-900">生成された謝罪文</h2>
                <p className="text-xs text-zinc-600 mt-1">
                  必要に応じて編集してご利用ください
                </p>
              </div>

              <div className="p-4">
                {currentApology ? (
                  <ApologyContent apology={currentApology} method={method} />
                ) : (
                  <div className="text-center py-8 text-zinc-500">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-zinc-400" />
                    <p>この組み合わせのテンプレートは準備中です</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Checklist items={situation.checklist} />
            <SolutionCards solutions={situation.solutions} />
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-zinc-500">
            Syazai.com - あらゆるミスの「正解」を、あなたに。
          </p>
        </div>
      </footer>
    </div>
  );
}
