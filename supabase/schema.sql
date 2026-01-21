-- 小陽春オンラインショップ データベーススキーマ
-- Supabaseダッシュボードの SQL Editor で実行してください

-- 商品テーブル
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  weight TEXT NOT NULL,
  description TEXT,
  ingredients TEXT,
  allergens TEXT,
  image_url TEXT,
  cart_image_url TEXT,
  story_keywords TEXT,
  catchphrase TEXT,
  color_theme TEXT DEFAULT 'orange' CHECK (color_theme IN ('orange', 'red', 'neutral')),
  display_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ショップ設定テーブル
CREATE TABLE shop_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_name TEXT NOT NULL DEFAULT '小陽春',
  hero_image_url TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 更新日時を自動更新するトリガー
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER shop_settings_updated_at
  BEFORE UPDATE ON shop_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS (Row Level Security) ポリシー
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_settings ENABLE ROW LEVEL SECURITY;

-- 公開商品は誰でも読み取り可能
CREATE POLICY "Public can read published products"
  ON products FOR SELECT
  USING (status = 'published');

-- 認証済みユーザーは全商品を読み取り可能
CREATE POLICY "Authenticated users can read all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

-- 認証済みユーザーは商品を追加・編集・削除可能
CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- ショップ設定は誰でも読み取り可能
CREATE POLICY "Public can read shop settings"
  ON shop_settings FOR SELECT
  USING (true);

-- 認証済みユーザーはショップ設定を編集可能
CREATE POLICY "Authenticated users can update shop settings"
  ON shop_settings FOR UPDATE
  TO authenticated
  USING (true);

-- 初期データ: ショップ設定
INSERT INTO shop_settings (shop_name, hero_title, hero_subtitle, hero_image_url)
VALUES (
  '小陽春',
  '心ほどける、ふわっ、もちっ。台湾の幸せを倉敷から。',
  '国産米粉100%が叶えた、究極の食感。体への優しさと、驚きの美味しさを、倉敷の小さなキッチンからお届けします。',
  '/images/hero.png'
);

-- 初期データ: 既存の3商品
INSERT INTO products (name, price, weight, description, ingredients, allergens, image_url, cart_image_url, story_keywords, catchphrase, color_theme, display_order, status)
VALUES
(
  '米粉台湾カステラ',
  1800,
  '450g',
  '国産米粉100%使用。驚くほど「ふわ・しゅわ」な食感とキビ砂糖の優しい甘さ。小麦粉不使用のグルテンフリーです。',
  '全卵、米粉(国産)、キビ砂糖、植物油、生乳、バニラエッセンス',
  '卵・乳',
  '/images/カステラ.png',
  '/images/カステラp.png',
  'ふわふわ、しゅわしゅわ、グルテンフリー、国産米粉',
  'ふわっ、しゅわっ',
  'orange',
  1,
  'published'
),
(
  '紅白湯圓（タンユェン）',
  1200,
  '350g (20個入)',
  '国産白玉粉を使用した、もちもちぷるんとした食感。お祝い事にもぴったりな華やかな紅白カラーです。',
  '白玉粉(国産)、砂糖、コーンスターチ、植物油、食塩、タピオカ澱粉',
  'なし',
  '/images/紅白.png',
  '/images/紅白p.png',
  'もちもち、ぷるん、紅白、お祝い',
  'もちっ、ぷるん',
  'red',
  2,
  'published'
),
(
  '胡麻湯圓（タンユェン）',
  1400,
  '350g (20個入)',
  '濃厚な黒胡麻餡がとろけ出す、台湾定番のスイーツ。国産白玉粉の生地で丁寧に包み込みました。',
  '（生地）白玉粉(国産)、砂糖、コーンスターチ、植物油、食塩、タピオカ澱粉（餡）黒胡麻(国内製造)、砂糖、澱粉、植物性油',
  'ごま・大豆',
  '/images/胡麻湯圓.png',
  '/images/胡麻p.png',
  '黒胡麻、とろける、濃厚、定番',
  'とろっ、濃厚',
  'neutral',
  3,
  'published'
);

-- Storage バケット作成（Supabaseダッシュボードで手動作成が必要）
-- 1. Storage > New bucket > "product-images" を作成
-- 2. Public bucket にチェック
