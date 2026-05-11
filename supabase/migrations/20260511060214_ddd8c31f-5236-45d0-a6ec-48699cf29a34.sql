
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS hero_video text;

UPDATE public.projects SET hero_video = 'https://videos.pexels.com/video-files/3015510/3015510-uhd_2560_1440_24fps.mp4' WHERE slug = 'aurelia-residences-palm-jumeirah';
UPDATE public.projects SET hero_video = 'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4' WHERE slug = 'the-monarch-tower-downtown';
UPDATE public.projects SET hero_video = 'https://videos.pexels.com/video-files/2169879/2169879-uhd_2560_1440_30fps.mp4' WHERE slug = 'coral-bay-villas-maldives';
UPDATE public.projects SET hero_video = 'https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4' WHERE slug = 'belgravia-mansions-london';
UPDATE public.projects SET hero_video = 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4' WHERE slug = 'marina-crest-residences';
UPDATE public.projects SET hero_video = 'https://videos.pexels.com/video-files/3773486/3773486-uhd_2560_1440_30fps.mp4' WHERE slug = 'saadiyat-grove-estates';
UPDATE public.projects SET hero_video = 'https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4' WHERE slug = 'the-savoy-collection-mayfair';
UPDATE public.projects SET hero_video = 'https://videos.pexels.com/video-files/4770381/4770381-uhd_2560_1440_24fps.mp4' WHERE slug = 'emerald-heights-resort';
