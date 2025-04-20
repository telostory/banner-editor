'use client';

import { forwardRef } from 'react';

const BannerPreview = forwardRef(({ bannerConfig }, ref) => {
  const { title, subtitle, backgroundColor, template, image, font } = bannerConfig;

  // 이미지 스타일에 따른 렌더링 결정
  const renderBanner = () => {
    if (template.imageStyle === 'semicircle') {
      return renderSemicircleTemplate();
    } else {
      return renderRoundedTemplate();
    }
  };

  // 둥근 모서리 이미지 템플릿 (1, 2번 케이스)
  const renderRoundedTemplate = () => {
    const isLeft = template.imagePosition === 'left';
    
    return (
      <>
        <div 
          style={{
            position: 'absolute',
            [isLeft ? 'left' : 'right']: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '210px',
            height: '160px',
          }}
        >
          {image ? (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <img
                src={image}
                alt="배너 이미지"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div 
              style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#ffffff', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <span style={{ color: '#bbbbbb' }}>이미지를 선택해주세요</span>
            </div>
          )}
        </div>
        <div 
          className={font.className}
          style={{
            position: 'absolute',
            [isLeft ? 'left' : 'right']: '290px',
            [isLeft ? 'right' : 'left']: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
          }}
        >
          <h1 style={{ fontSize: '3.0rem', marginBottom: '8px' }}>{title}</h1>
          <h2 style={{ fontSize: '3.0rem' }}>{subtitle}</h2>
        </div>
      </>
    );
  };

  // 반원형 템플릿 (3, 4번 케이스)
  const renderSemicircleTemplate = () => {
    const isLeft = template.imagePosition === 'left';
    const semicircleSize = 480; // 반원 크기
    
    return (
      <>
        <div 
          style={{
            position: 'absolute',
            [isLeft ? 'left' : 'right']: -semicircleSize / 2,
            top: 0,
            width: semicircleSize,
            height: '240px',
            overflow: 'hidden',
            borderRadius: isLeft ? '0 240px 240px 0' : '240px 0 0 240px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          {image ? (
            <div style={{ 
              position: 'relative',
              width: '100%', 
              height: '100%',
              display: 'flex',
              justifyContent: isLeft ? 'flex-start' : 'flex-end',
              alignItems: 'center'
            }}>
              <img
                src={image}
                alt="배너 이미지"
                style={{ 
                  width: '240px', 
                  height: '180px', 
                  objectFit: 'cover',
                  marginLeft: isLeft ? '0' : 'auto',
                  marginRight: isLeft ? 'auto' : '0',
                  borderRadius: '12px'
                }}
              />
            </div>
          ) : (
            <div style={{ 
              position: 'relative',
              width: '100%', 
              height: '100%',
              display: 'flex',
              justifyContent: isLeft ? 'flex-start' : 'flex-end',
              alignItems: 'center'
            }}>
              <div style={{
                width: '240px', 
                height: '180px',
                backgroundColor: '#ffffff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: isLeft ? '0' : 'auto',
                marginRight: isLeft ? 'auto' : '0',
                borderRadius: '12px'
              }}>
                <span style={{ color: '#bbbbbb' }}>이미지를 선택해주세요</span>
              </div>
            </div>
          )}
        </div>
        <div 
          className={font.className}
          style={{
            position: 'absolute',
            [isLeft ? 'right' : 'left']: '40px',
            width: '300px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            textAlign: isLeft ? 'right' : 'left'
          }}
        >
          <h1 style={{ fontSize: '3.0rem', marginBottom: '8px' }}>{title}</h1>
          <h2 style={{ fontSize: '3.0rem' }}>{subtitle}</h2>
        </div>
      </>
    );
  };

  return (
    <div className="preview">
      <div
        ref={ref}
        className="banner"
        style={{
          backgroundColor,
          position: 'relative',
          width: '720px',
          height: '240px',
          overflow: 'hidden',
        }}
      >
        {renderBanner()}
      </div>
    </div>
  );
});

BannerPreview.displayName = 'BannerPreview';

export default BannerPreview; 