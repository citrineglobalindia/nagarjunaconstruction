
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  bedrooms_min INT,
  bedrooms_max INT,
  price_from BIGINT,
  hero_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  amenities JSONB DEFAULT '[]'::jsonb,
  handover_date TEXT,
  brochure_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  message TEXT,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are publicly viewable" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

INSERT INTO public.projects (slug, name, location, type, status, bedrooms_min, bedrooms_max, price_from, hero_image, gallery, description, amenities, handover_date, featured) VALUES
('aurelia-residences-palm-jumeirah', 'Aurelia Residences', 'Palm Jumeirah, Dubai', 'Branded Residence', 'Off-Plan', 2, 5, 4500000, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80', '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80","https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"]'::jsonb, 'A masterpiece of modern architecture rising over the Palm. Aurelia Residences offers an intimate collection of sky homes with private terraces and curated concierge.', '["Infinity Pool","Private Beach","Concierge","Valet","Spa","Gym","Smart Home","Kids Club"]'::jsonb, 'Q4 2027', true),
('the-monarch-tower-downtown', 'The Monarch Tower', 'Downtown, Dubai', 'Apartment', 'Under Construction', 1, 4, 2200000, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80', '["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80","https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80"]'::jsonb, 'Live above the skyline of Downtown Dubai with uninterrupted Burj Khalifa views and refined interiors crafted by Italian ateliers.', '["Infinity Pool","Concierge","Valet","Spa","Gym","Smart Home"]'::jsonb, 'Q2 2026', true),
('coral-bay-villas-maldives', 'Coral Bay Villas', 'Baa Atoll, Maldives', 'Villa', 'Ready', 3, 6, 8900000, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80', '["https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1600&q=80","https://images.unsplash.com/photo-1573548842355-73bb50e50323?w=1600&q=80"]'::jsonb, 'A private constellation of overwater and beach villas, each with a personal butler, infinity pool and direct lagoon access.', '["Private Beach","Concierge","Spa","Gym","Smart Home","Kids Club"]'::jsonb, 'Ready Now', true),
('belgravia-mansions-london', 'Belgravia Mansions', 'Belgravia, London', 'Townhouse', 'Ready', 4, 6, 12500000, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80', '["https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80"]'::jsonb, 'Restored Georgian townhouses in the heart of Belgravia, blending heritage architecture with discreet modern luxury.', '["Concierge","Valet","Gym","Spa","Smart Home"]'::jsonb, 'Ready Now', false),
('marina-crest-residences', 'Marina Crest Residences', 'Dubai Marina, Dubai', 'Apartment', 'Off-Plan', 1, 3, 1650000, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80', '["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80"]'::jsonb, 'Slender twin towers along the Marina promenade, with sunset-facing residences and a sky-deck infinity pool.', '["Infinity Pool","Concierge","Gym","Smart Home","Kids Club"]'::jsonb, 'Q1 2028', false),
('saadiyat-grove-estates', 'Saadiyat Grove Estates', 'Saadiyat Island, Abu Dhabi', 'Villa', 'Under Construction', 4, 7, 9750000, 'https://images.unsplash.com/photo-1613553474179-e1eda3ea5734?w=1920&q=80', '["https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600&q=80"]'::jsonb, 'Sculpted villas surrounded by museums, beaches and cultural landmarks on Saadiyat Island.', '["Private Beach","Concierge","Spa","Gym","Smart Home","Kids Club"]'::jsonb, 'Q3 2026', true),
('the-savoy-collection-mayfair', 'The Savoy Collection', 'Mayfair, London', 'Branded Residence', 'Off-Plan', 2, 5, 14200000, 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1920&q=80', '["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80"]'::jsonb, 'Hotel-branded residences on the edge of Hyde Park with five-star service and private members'' lounge.', '["Concierge","Valet","Spa","Gym","Smart Home"]'::jsonb, 'Q2 2027', false),
('emerald-heights-resort', 'Emerald Heights Resort & Residences', 'Ras Al Khaimah, UAE', 'Hotel', 'Under Construction', 1, 3, 1350000, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80', '["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80"]'::jsonb, 'A mountainside resort and residence offering hotel-managed homes with full rental program.', '["Infinity Pool","Concierge","Spa","Gym","Smart Home","Kids Club"]'::jsonb, 'Q4 2026', false);
