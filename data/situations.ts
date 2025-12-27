export type RecipientType = 'client' | 'boss' | 'customer' | 'friend';
export type MethodType = 'email' | 'chat' | 'phone';
export type ExcuseType = 'health' | 'system' | 'traffic' | 'family' | 'none';

export interface ApologyContent {
  subjects?: string[];
  body: string;
  opening?: string;
  closing?: string;
}

export interface ApologyVariant {
  recipient: RecipientType;
  method: MethodType;
  content: ApologyContent;
  excuseVariants?: {
    [key in ExcuseType]?: Partial<ApologyContent>;
  };
}

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface SolutionCard {
  id: string;
  title: string;
  description: string;
  link?: string;
  icon: string;
}

export interface Situation {
  slug: string;
  title: string;
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  apologies: ApologyVariant[];
  checklist: ChecklistItem[];
  solutions: SolutionCard[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  situations: string[];
}

export const categories: Category[] = [
  {
    id: 'business',
    name: 'ビジネス',
    description: '遅刻・ミス・報告漏れなど',
    icon: 'Briefcase',
    situations: ['delay-meeting', 'email-mistake'],
  },
  {
    id: 'private',
    name: 'プライベート',
    description: '約束忘れ・借り物破損など',
    icon: 'Heart',
    situations: ['forgot-promise'],
  },
  {
    id: 'entertainment',
    name: 'エンタメ',
    description: 'フリスビー事故・その他予想外の事態',
    icon: 'Sparkles',
    situations: ['frisbee-accident'],
  },
];

export const situations: Situation[] = [
  {
    slug: 'delay-meeting',
    title: '会議遅刻',
    category: 'business',
    description: '重要な会議に遅刻してしまった場合の謝罪',
    severity: 'high',
    apologies: [
      {
        recipient: 'client',
        method: 'email',
        content: {
          subjects: [
            '【お詫び】本日の会議への遅刻について',
            '会議遅刻のお詫びとご報告',
            '【深くお詫び申し上げます】本日の遅刻について',
          ],
          body: `○○株式会社
○○様

いつも大変お世話になっております。
株式会社△△の□□でございます。

本日の会議に遅刻いたしましたこと、
心よりお詫び申し上げます。

ご多忙の中、貴重なお時間をいただいておりながら、
このような失態を犯してしまい、誠に申し訳ございませんでした。

今後このようなことがないよう、
時間管理を徹底してまいります。

何卒ご容赦いただけますと幸いです。

引き続き、よろしくお願い申し上げます。`,
        },
        excuseVariants: {
          health: {
            body: `○○株式会社
○○様

いつも大変お世話になっております。
株式会社△△の□□でございます。

本日の会議に遅刻いたしましたこと、
心よりお詫び申し上げます。

朝方より体調を崩しておりましたが、
会議には必ず出席すべきと判断し、
結果として皆様をお待たせしてしまいました。

体調管理も含め、今後はより一層気をつけてまいります。

何卒ご容赦いただけますと幸いです。`,
          },
          traffic: {
            body: `○○株式会社
○○様

いつも大変お世話になっております。
株式会社△△の□□でございます。

本日の会議に遅刻いたしましたこと、
心よりお詫び申し上げます。

電車の遅延により到着が遅れましたが、
より余裕を持った行動をすべきでした。

今後は不測の事態にも対応できるよう、
早めの出発を心がけます。

何卒ご容赦いただけますと幸いです。`,
          },
        },
      },
      {
        recipient: 'client',
        method: 'chat',
        content: {
          body: `お疲れ様です。○○です。

先ほどの会議、遅刻してしまい大変申し訳ございませんでした。
ご迷惑をおかけしたこと、深くお詫び申し上げます。

今後このようなことがないよう、十分気をつけます。`,
        },
      },
      {
        recipient: 'client',
        method: 'phone',
        content: {
          opening: 'お忙しいところ恐れ入ります。株式会社△△の□□でございます。',
          body: `本日の会議に遅刻いたしましたこと、
まずは直接お詫びを申し上げたく、お電話いたしました。

ご多忙の中、貴重なお時間をいただいておりながら、
このような失態を犯してしまい、誠に申し訳ございませんでした。

[相手の反応を待つ]

ありがとうございます。
今後このようなことがないよう、
時間管理を徹底してまいります。`,
          closing: '本日は貴重なお時間をいただき、ありがとうございました。引き続きよろしくお願いいたします。',
        },
      },
      {
        recipient: 'boss',
        method: 'email',
        content: {
          subjects: [
            '【お詫び】本日の会議遅刻について',
            '会議遅刻のお詫び',
            '本日の遅刻についてのご報告とお詫び',
          ],
          body: `○○部長

お疲れ様です。○○です。

本日の会議に遅刻いたしましたこと、
深くお詫び申し上げます。

皆様のお時間を無駄にしてしまい、
また、チームにご迷惑をおかけしたこと、
重ねてお詫び申し上げます。

今後は余裕を持った行動を心がけ、
二度とこのようなことがないよう
十分に注意いたします。

ご指導のほど、よろしくお願いいたします。`,
        },
      },
      {
        recipient: 'boss',
        method: 'chat',
        content: {
          body: `○○部長

お疲れ様です。

先ほどの会議、遅刻して申し訳ありませんでした。
以後、気をつけます。`,
        },
      },
      {
        recipient: 'boss',
        method: 'phone',
        content: {
          opening: 'お疲れ様です。○○です。今、お時間よろしいでしょうか。',
          body: `本日の会議に遅刻してしまい、
申し訳ありませんでした。

皆さんをお待たせしてしまい、
大変反省しております。

[上司の反応を待つ]

ありがとうございます。
今後は十分に気をつけます。`,
          closing: 'ありがとうございました。失礼いたします。',
        },
      },
      {
        recipient: 'customer',
        method: 'email',
        content: {
          subjects: [
            '【お詫び】本日のご対応遅れについて',
            'ご面談遅刻のお詫び',
            '【深くお詫び申し上げます】本日の遅刻について',
          ],
          body: `○○様

いつもお引き立ていただき、誠にありがとうございます。
○○の□□でございます。

本日、お約束の時間に遅れてしまい、
大変申し訳ございませんでした。

お客様の貴重なお時間を無駄にしてしまいましたこと、
心よりお詫び申し上げます。

今後このようなことがないよう、
時間厳守を徹底してまいります。

何卒ご容赦くださいますよう、
お願い申し上げます。`,
        },
      },
      {
        recipient: 'customer',
        method: 'chat',
        content: {
          body: `○○様

お世話になっております。
先ほどはお待たせしてしまい、大変申し訳ございませんでした。

今後このようなことがないよう気をつけます。
何卒よろしくお願いいたします。`,
        },
      },
      {
        recipient: 'customer',
        method: 'phone',
        content: {
          opening: 'お忙しいところ恐れ入ります。○○の□□でございます。',
          body: `先ほどはお待たせしてしまい、
大変申し訳ございませんでした。

お客様の貴重なお時間を無駄にしてしまい、
深く反省しております。

[相手の反応を待つ]

ありがとうございます。
今後このようなことがないよう、
十分に注意いたします。`,
          closing: 'お忙しいところ、お時間をいただきありがとうございました。今後ともよろしくお願いいたします。',
        },
      },
      {
        recipient: 'friend',
        method: 'email',
        content: {
          subjects: [
            '遅れてごめん！',
            'さっきはごめんね',
            '遅刻のお詫び',
          ],
          body: `○○へ

さっきは遅刻してごめんね。
待たせてしまって本当に申し訳ない。

次からはもっと余裕を持って行動するね。
本当にごめん！`,
        },
      },
      {
        recipient: 'friend',
        method: 'chat',
        content: {
          body: `さっきは遅れてごめん！
待たせちゃって本当に申し訳ない。
次から気をつけるね。`,
        },
      },
      {
        recipient: 'friend',
        method: 'phone',
        content: {
          opening: 'もしもし、○○？今大丈夫？',
          body: `さっきは遅刻してごめんね。
待たせてしまって申し訳なかった。

[相手の反応を待つ]

ありがとう。
次からはもっと早く出るようにするね。`,
          closing: 'じゃあまたね。今日は本当にごめんね。',
        },
      },
    ],
    checklist: [
      { id: '1', text: '宛名・敬称は正しいか' },
      { id: '2', text: '日時の記載は正確か' },
      { id: '3', text: '言い訳が長すぎないか' },
      { id: '4', text: '今後の対策を明記しているか' },
      { id: '5', text: '誤字脱字がないか' },
      { id: '6', text: '送信先を再確認したか' },
    ],
    solutions: [
      {
        id: '1',
        title: 'スケジュール管理アプリの導入',
        description: 'Googleカレンダー等で通知を設定し、遅刻を防止',
        icon: 'Calendar',
      },
      {
        id: '2',
        title: '菓子折りで誠意を伝える',
        description: 'ヨックモック等、定番の菓子折りで気持ちを形に',
        icon: 'Gift',
      },
      {
        id: '3',
        title: '乗り換えアプリの活用',
        description: '電車遅延情報をリアルタイムで確認',
        icon: 'Train',
      },
    ],
  },
  {
    slug: 'frisbee-accident',
    title: 'フリスビー事故',
    category: 'entertainment',
    description: 'フリスビーが人や物に当たってしまった場合の謝罪',
    severity: 'medium',
    apologies: [
      {
        recipient: 'client',
        method: 'email',
        content: {
          subjects: [
            '【お詫び】先日の事故について',
            '当方の不注意によるお怪我（物損）のお詫び',
            '【深くお詫び申し上げます】フリスビーによる件',
          ],
          body: `○○様

突然のご連絡、失礼いたします。
先日、公園にてフリスビーを投げた際に、
○○様にご迷惑をおかけしました□□と申します。

この度は、私の不注意により
大変なご迷惑をおかけしましたこと、
心よりお詫び申し上げます。

お怪我の具合はいかがでしょうか。
治療費等につきましては、
責任を持って対応させていただきます。

今後は周囲の安全を十分に確認し、
このような事故を起こさないよう
細心の注意を払ってまいります。

重ねてお詫び申し上げますとともに、
何かございましたらご連絡ください。`,
        },
      },
      {
        recipient: 'client',
        method: 'chat',
        content: {
          body: `○○様

先日は大変失礼いたしました。
フリスビーが当たってしまい、本当に申し訳ございませんでした。

お怪我の具合はいかがでしょうか。
何かございましたら、遠慮なくおっしゃってください。`,
        },
      },
      {
        recipient: 'client',
        method: 'phone',
        content: {
          opening: 'お忙しいところ恐れ入ります。先日フリスビーでご迷惑をおかけした□□と申します。',
          body: `この度は私の不注意で
大変ご迷惑をおかけしまして、
誠に申し訳ございませんでした。

お怪我の具合はいかがでしょうか。

[相手の反応を待つ]

治療費等につきましては、
もちろん責任を持って対応させていただきます。

今後はこのようなことがないよう、
十分に注意いたします。`,
          closing: 'お忙しいところ、お時間をいただきありがとうございました。何かございましたら、いつでもご連絡ください。',
        },
      },
      {
        recipient: 'boss',
        method: 'email',
        content: {
          subjects: [
            '【ご報告】休日中の事故について',
            '私事のご報告とお詫び',
            'フリスビー事故のご報告',
          ],
          body: `○○部長

お疲れ様です。○○です。

私事で恐縮ですが、休日にフリスビーで
他人様にご迷惑をおかけする事故を起こしてしまいました。

現在、相手方と誠意を持って対応しておりますが、
今後の経過によっては業務に影響が出る可能性もあり、
事前にご報告させていただきました。

ご心配をおかけして申し訳ございません。
状況が変わりましたら、改めてご報告いたします。`,
        },
      },
      {
        recipient: 'boss',
        method: 'chat',
        content: {
          body: `○○部長

お疲れ様です。

私事のご報告です。休日にフリスビーで
事故を起こしてしまいました。
現在、相手方と対応中です。

業務に影響が出る場合は、すぐにご報告いたします。`,
        },
      },
      {
        recipient: 'boss',
        method: 'phone',
        content: {
          opening: 'お疲れ様です。○○です。私事のご報告でお電話しました。',
          body: `実は休日にフリスビーで
事故を起こしてしまいまして...

[状況を説明]

現在、相手方と誠意を持って対応しております。

[上司の反応を待つ]

ありがとうございます。
状況が変わりましたら、すぐにご報告いたします。`,
          closing: 'お時間いただきありがとうございました。失礼いたします。',
        },
      },
      {
        recipient: 'customer',
        method: 'email',
        content: {
          subjects: [
            '【お詫び】先日の件について',
            '当方の不注意によるお詫び',
            '【深くお詫び申し上げます】事故の件',
          ],
          body: `○○様

先日は大変失礼いたしました。
フリスビーでご迷惑をおかけした□□でございます。

私の不注意により、
ご不快な思いをおかけしましたこと、
心よりお詫び申し上げます。

お怪我はございませんでしたでしょうか。
物損等ございましたら、
誠意を持って対応させていただきます。

今後は周囲の安全に十分配慮し、
二度とこのようなことがないよう
気をつけてまいります。`,
        },
      },
      {
        recipient: 'customer',
        method: 'chat',
        content: {
          body: `○○様

先日は大変失礼いたしました。
フリスビーが当たってしまい、誠に申し訳ございませんでした。

お怪我等ございませんでしたでしょうか。
何かございましたら、お知らせください。`,
        },
      },
      {
        recipient: 'customer',
        method: 'phone',
        content: {
          opening: 'お忙しいところ恐れ入ります。先日フリスビーでご迷惑をおかけした□□です。',
          body: `先日は私の不注意で
ご迷惑をおかけしまして、
大変申し訳ございませんでした。

お怪我の具合はいかがでしょうか。

[相手の反応を待つ]

何かございましたら、
いつでもおっしゃってください。
誠意を持って対応させていただきます。`,
          closing: 'お時間をいただきありがとうございました。失礼いたします。',
        },
      },
      {
        recipient: 'friend',
        method: 'email',
        content: {
          subjects: [
            'この前は本当にごめん！',
            'フリスビーの件、ごめんね',
            '大丈夫だった？ごめんね',
          ],
          body: `○○へ

この前はフリスビー当ててしまって
本当にごめんね！

痛かったよね...大丈夫だった？
まだ痛むようだったら教えて。

次からはもっと気をつけるね。
本当にごめん！`,
        },
      },
      {
        recipient: 'friend',
        method: 'chat',
        content: {
          body: `ごめん！！！
フリスビー当てちゃって本当にごめんね！
大丈夫だった？痛くない？

次から気をつけるね...`,
        },
      },
      {
        recipient: 'friend',
        method: 'phone',
        content: {
          opening: 'もしもし、○○？さっきはごめんね！',
          body: `フリスビー当てちゃって本当にごめん！
大丈夫だった？

[相手の反応を待つ]

よかった...本当にごめんね。
次からは気をつけるから。`,
          closing: 'じゃあまたね。本当にごめんね！',
        },
      },
    ],
    checklist: [
      { id: '1', text: '相手のお怪我の状況を確認したか' },
      { id: '2', text: '物損がある場合、状況を把握したか' },
      { id: '3', text: '連絡先を交換したか' },
      { id: '4', text: '必要に応じて保険会社に連絡したか' },
      { id: '5', text: '言い訳をしすぎていないか' },
      { id: '6', text: '今後の対応について明記したか' },
    ],
    solutions: [
      {
        id: '1',
        title: '個人賠償責任保険への加入',
        description: '日常生活での事故に備えて、保険への加入を検討',
        icon: 'Shield',
      },
      {
        id: '2',
        title: '菓子折りで誠意を伝える',
        description: '直接お詫びに伺う際は、菓子折り持参で',
        icon: 'Gift',
      },
      {
        id: '3',
        title: '安全なフリスビーへの買い替え',
        description: 'ソフトタイプのフリスビーで怪我のリスクを軽減',
        icon: 'Disc',
      },
    ],
  },
];

export function getSituationBySlug(slug: string): Situation | undefined {
  return situations.find((s) => s.slug === slug);
}

export function getApologyContent(
  situation: Situation,
  recipient: RecipientType,
  method: MethodType,
  excuse: ExcuseType = 'none'
): ApologyVariant | undefined {
  const baseApology = situation.apologies.find(
    (a) => a.recipient === recipient && a.method === method
  );

  if (!baseApology) return undefined;

  if (excuse !== 'none' && baseApology.excuseVariants?.[excuse]) {
    return {
      ...baseApology,
      content: {
        ...baseApology.content,
        ...baseApology.excuseVariants[excuse],
      },
    };
  }

  return baseApology;
}

export function searchSituations(query: string): Situation[] {
  const normalizedQuery = query.toLowerCase();
  return situations.filter(
    (s) =>
      s.title.toLowerCase().includes(normalizedQuery) ||
      s.description.toLowerCase().includes(normalizedQuery) ||
      s.slug.toLowerCase().includes(normalizedQuery)
  );
}
