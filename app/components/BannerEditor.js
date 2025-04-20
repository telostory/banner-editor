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
    id: 'left-image-rounded',
    name: '왼쪽 이미지',
    imagePosition: 'left',
    textPosition: 'right',
    imageStyle: 'rounded',
  },
  {
    id: 'right-image-rounded',
    name: '오른쪽 이미지',
    imagePosition: 'right',
    textPosition: 'left',
    imageStyle: 'rounded',
  },
  {
    id: 'semicircle-left',
    name: '둥근 왼쪽 이미지',
    imagePosition: 'left',
    textPosition: 'right',
    imageStyle: 'semicircle',
  },
  {
    id: 'semicircle-right',
    name: '둥근 오른쪽 이미지',
    imagePosition: 'right',
    textPosition: 'left',
    imageStyle: 'semicircle',
  },
];

const FONTS = [
  {
    id: 'hanna-pro',
    name: '배민 한나체 Pro',
    className: 'font-hanna-pro',
  },
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
];

export default function BannerEditor() {
  const [bannerConfig, setBannerConfig] = useState({
    title: '타이틀 입력',
    subtitle: '서브타이틀 입력',
    backgroundColor: PRESET_COLORS[0],
    template: TEMPLATES[0],
    image: null,
    font: FONTS[0],
    imagePositionX: 50, // 이미지 좌우 위치 조정용 슬라이더 값 (0-100, 기본값 50)
  });

  const bannerRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);
    
    if (file) {
      // 파일 유형 확인
      if (!file.type.startsWith('image/')) {
        console.error("Selected file is not an image:", file.type);
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        console.log("File loaded successfully");
        const imageData = event.target.result;
        
        setBannerConfig((prevConfig) => ({
          ...prevConfig,
          image: imageData,
        }));
      };
      
      reader.onerror = (error) => {
        console.error("Error loading image:", error);
        alert("이미지를 불러오는 중 오류가 발생했습니다.");
      };
      
      try {
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error reading file:", error);
        alert("파일을 읽는 중 오류가 발생했습니다.");
      }
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

  const handleImagePositionChange = (position) => {
    setBannerConfig({
      ...bannerConfig,
      imagePositionX: position,
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

  const handleRegisterMaterial = () => {
    // 실제 API 연결 전 목업 기능
    alert('소재 이미지로 등록되었습니다');
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
        onImagePositionChange={handleImagePositionChange}
        onDownload={handleDownload}
        onRegisterMaterial={handleRegisterMaterial}
      />
      <BannerPreview
        ref={bannerRef}
        bannerConfig={bannerConfig}
      />
    </div>
  );
} 