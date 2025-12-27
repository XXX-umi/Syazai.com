'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Briefcase, Heart, Sparkles, AlertTriangle, ChevronRight } from 'lucide-react';
import { categories, situations } from '@/data/situations';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Heart,
  Sparkles,
};

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof situations>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = situations.filter(
        (s) =>
          s.title.includes(query) ||
          s.description.includes(query) ||
          s.slug.includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSelectSituation = (slug: string) => {
    router.push(`/s/${slug}`);
  };

  const getCategoryIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Briefcase;
    return Icon;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-zinc-900" />
            <span className="font-bold text-xl tracking-tight text-zinc-900">Syazai.com</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <a href="#categories" className="hover:text-zinc-900 transition-colors">カテゴリー</a>
            <a href="#about" className="hover:text-zinc-900 transition-colors">使い方</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.02),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.02),transparent_50%)]" />

          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-zinc-100 text-zinc-600 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>緊急時に、すぐ使える</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight mb-6">
              あらゆるミスの<br className="md:hidden" />
              <span className="relative">
                「正解」
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-zinc-200/50 -z-10" />
              </span>
              がここにある。
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 mb-12 max-w-2xl mx-auto">
              状況を選ぶだけで、最適な謝罪文を生成。<br />
              ビジネスからプライベートまで、すべてのシーンに対応。
            </p>

            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="状況を検索... (例: 会議遅刻、フリスビー)"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery && setShowResults(true)}
                  className="w-full h-14 pl-12 pr-4 text-lg border-2 border-zinc-200 rounded-xl shadow-sm focus:border-zinc-400 focus:ring-zinc-400 bg-white"
                />
              </div>

              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden z-10">
                  {searchResults.map((situation) => (
                    <button
                      key={situation.slug}
                      onClick={() => handleSelectSituation(situation.slug)}
                      className="w-full px-4 py-3 text-left hover:bg-zinc-50 flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <div className="font-medium text-zinc-900">{situation.title}</div>
                        <div className="text-sm text-zinc-500">{situation.description}</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {showResults && searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-xl shadow-lg p-4 text-center text-zinc-500 z-10">
                  該当する状況が見つかりませんでした
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-zinc-500">人気の検索:</span>
              {['会議遅刻', 'フリスビー'].map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="categories" className="py-20 bg-white border-t border-zinc-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
                カテゴリーから探す
              </h2>
              <p className="text-zinc-600">
                シーンに合わせた謝罪テンプレートをご用意しています
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category.icon);
                const categorySituations = situations.filter(
                  (s) => s.category === category.id
                );

                return (
                  <Card
                    key={category.id}
                    className="group hover:shadow-lg transition-all duration-300 border-zinc-200 hover:border-zinc-300"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-zinc-100 flex items-center justify-center mb-4 group-hover:bg-zinc-200 transition-colors">
                        <Icon className="h-6 w-6 text-zinc-700" />
                      </div>
                      <CardTitle className="text-xl text-zinc-900">{category.name}</CardTitle>
                      <CardDescription className="text-zinc-500">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {categorySituations.slice(0, 3).map((situation) => (
                          <button
                            key={situation.slug}
                            onClick={() => handleSelectSituation(situation.slug)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-50 flex items-center justify-between text-sm group/item transition-colors"
                          >
                            <span className="text-zinc-700">{situation.title}</span>
                            <ChevronRight className="h-4 w-4 text-zinc-400 group-hover/item:text-zinc-600 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-zinc-50 border-t border-zinc-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
                使い方
              </h2>
              <p className="text-zinc-600">
                3ステップで最適な謝罪を実行
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: '状況を選択',
                  description: '検索またはカテゴリーから、あなたの状況に合ったシナリオを選びます。',
                },
                {
                  step: '02',
                  title: '相手・手段を設定',
                  description: '謝罪の相手（取引先/上司/友人）と手段（メール/チャット/電話）を選びます。',
                },
                {
                  step: '03',
                  title: 'コピーして実行',
                  description: '生成された謝罪文をコピーし、必要に応じて編集して送信します。',
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 text-white font-bold text-sm mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg text-zinc-900 mb-2">{item.title}</h3>
                  <p className="text-zinc-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-zinc-600" />
            <span className="font-bold text-zinc-900">Syazai.com</span>
          </div>
          <p className="text-sm text-zinc-500">
            あらゆるミスの「正解」を、あなたに。
          </p>
        </div>
      </footer>
    </div>
  );
}
