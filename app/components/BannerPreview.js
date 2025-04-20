'use client';

import { forwardRef } from 'react';

const BannerPreview = forwardRef(({ bannerConfig }, ref) => {
  const { title, subtitle, backgroundColor, template, image, font } = bannerConfig;

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
        {template.imagePosition === 'left' ? (
          <>
            <div 
              style={{
                position: 'absolute',
                left: '40px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '210px',
                height: '160px',
              }}
            >
              {image ? (
                <div className={template.imageStyle === 'rounded' ? 'rounded-image' : ''}>
                  <img
                    src={image}
                    alt="배너 이미지"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div 
                  className={template.imageStyle === 'rounded' ? 'rounded-image' : ''}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: '#ffffff', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
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
                left: '290px',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '40px',
                color: 'white',
              }}
            >
              <h1 style={{ fontSize: '2.8rem', marginBottom: '8px' }}>{title}</h1>
              <h2 style={{ fontSize: '2rem' }}>{subtitle}</h2>
            </div>
          </>
        ) : (
          <>
            <div 
              style={{
                position: 'absolute',
                right: '40px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '210px',
                height: '160px',
              }}
            >
              {image ? (
                <div className={template.imageStyle === 'rounded' ? 'rounded-image' : ''}>
                  <img
                    src={image}
                    alt="배너 이미지"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div 
                  className={template.imageStyle === 'rounded' ? 'rounded-image' : ''}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: '#ffffff', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
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
                right: '290px',
                top: '50%',
                transform: 'translateY(-50%)',
                left: '40px',
                color: 'white',
              }}
            >
              <h1 style={{ fontSize: '2.8rem', marginBottom: '8px' }}>{title}</h1>
              <h2 style={{ fontSize: '2rem' }}>{subtitle}</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

BannerPreview.displayName = 'BannerPreview';

export default BannerPreview; 