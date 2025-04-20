'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import Controls from './Controls';
import BannerPreview from './BannerPreview';

const PRESET_COLORS = [
  '#f87171', // 레드
  '#fb923c', // 오렌지
  '#facc15', // 옐로우
  '#4ade80', // 그린
  '#60a5fa', // 블루
  '#a78bfa', // 퍼플
  '#f472b6', // 핑크
  '#1e293b', // 다크 블루
];

const TEMPLATES = [
  {
    id: 'left-image',
    name: '왼쪽 이미지',
    imagePosition: 'left',
    textPosition: 'right',
    imageStyle: 'normal',
  },
  {
    id: 'right-image',
    name: '오른쪽 이미지',
    imagePosition: 'right',
    textPosition: 'left',
    imageStyle: 'normal',
  },
  {
    id: 'rounded-left',
    name: '둥근 왼쪽 이미지',
    imagePosition: 'left',
    textPosition: 'right',
    imageStyle: 'rounded',
  },
  {
    id: 'rounded-right',
    name: '둥근 오른쪽 이미지',
    imagePosition: 'right',
    textPosition: 'left',
    imageStyle: 'rounded',
  },
];

const FONTS = [
  {
    id: 'jua',
    name: '배민 주아체',
    className: 'font-jua',
  },
  {
    id: 'hanna-air',
    name: '배민 한나체 Air',
    className: 'font-hanna-air',
  },
  {
    id: 'hanna-pro',
    name: '배민 한나체 Pro',
    className: 'font-hanna-pro',
  },
];

export default function BannerEditor() {
  const [bannerConfig, setBannerConfig] = useState({
    title: '타이틀을 입력하세요',
    subtitle: '서브 타이틀을 입력하세요',
    backgroundColor: PRESET_COLORS[0],
    template: TEMPLATES[0],
    image: null,
    font: FONTS[0],
  });

  const bannerRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerConfig({
          ...bannerConfig,
          image: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateChange = (template) => {
    setBannerConfig({
      ...bannerConfig, 
      template,
    });
  };

  const handleColorChange = (color) => {
    setBannerConfig({
      ...bannerConfig,
      backgroundColor: color,
    });
  };

  const handleTextChange = (field, value) => {
    setBannerConfig({
      ...bannerConfig,
      [field]: value,
    });
  };

  const handleFontChange = (font) => {
    setBannerConfig({
      ...bannerConfig,
      font,
    });
  };

  const handleDownload = async () => {
    if (bannerRef.current) {
      try {
        const dataUrl = await toPng(bannerRef.current, { quality: 0.95 });
        const link = document.createElement('a');
        link.download = 'banner.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('이미지 생성 중 오류가 발생했습니다:', error);
      }
    }
  };

  return (
    <div className="editor-container">
      <Controls
        bannerConfig={bannerConfig}
        templates={TEMPLATES}
        colors={PRESET_COLORS}
        fonts={FONTS}
        onImageUpload={handleImageUpload}
        onTemplateChange={handleTemplateChange}
        onColorChange={handleColorChange}
        onTextChange={handleTextChange}
        onFontChange={handleFontChange}
        onDownload={handleDownload}
      />
      <BannerPreview
        ref={bannerRef}
        bannerConfig={bannerConfig}
      />
    </div>
  );
} 