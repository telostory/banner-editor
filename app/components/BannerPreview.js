'use client';

import { forwardRef, useEffect } from 'react';

const BannerPreview = forwardRef(({ bannerConfig }, ref) => {
  const { title, subtitle, backgroundColor, template, image, font, imagePositionX } = bannerConfig;

  // 디버깅을 위한 로그 추가
  useEffect(() => {
    if (image) {
      console.log("이미지 데이터 존재:", image.substring(0, 50) + "...");
      console.log("현재 템플릿:", template.id);
    }
  }, [image, template.id]);

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
    
    // 이미지 위치 조정 계산 (0-100 값을 실제 위치값으로 변환)
    const objectPosition = image && imagePositionX !== undefined 
      ? `${imagePositionX}% center` 
      : 'center';
    
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
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  objectPosition
                }}
                onError={(e) => {
                  console.error("이미지 로드 오류:", e);
                  e.target.style.display = 'none';
                }}
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
                overflow: 'hidden',
                border: '1px dashed #cccccc'
              }}
            >
              <span style={{ color: '#bbbbbb', fontSize: '0.9rem', textAlign: 'center' }}>이미지를 선택해주세요</span>
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
          <h1 style={{ fontSize: '3.0rem', marginBottom: '8px', fontWeight: 'normal' }}>{title}</h1>
          <h2 style={{ fontSize: '3.0rem', fontWeight: 'normal' }}>{subtitle}</h2>
        </div>
      </>
    );
  };

  // 반원형 템플릿 (3, 4번 케이스)
  const renderSemicircleTemplate = () => {
    const isLeft = template.imagePosition === 'left';
    const circleSize = 280; // 원 크기 - 배너 가로 280px만 차지하도록 조정
    
    // 이미지 위치 조정 계산 (0-100 값을 실제 위치값으로 변환)
    const objectPosition = image && imagePositionX !== undefined 
      ? `${imagePositionX}% center` 
      : isLeft ? 'left center' : 'right center';
    
    return (
      <>
        {/* 텍스트 영역 */}
        <div 
          className={font.className}
          style={{
            position: 'absolute',
            [isLeft ? 'right' : 'left']: '40px',
            width: '300px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            textAlign: isLeft ? 'right' : 'left',
            zIndex: 2,
          }}
        >
          <h1 style={{ fontSize: '3.0rem', marginBottom: '8px', fontWeight: 'normal' }}>{title}</h1>
          <h2 style={{ fontSize: '3.0rem', fontWeight: 'normal' }}>{subtitle}</h2>
        </div>
        
        {/* 이미지 영역 - 원형 마스킹 (방향 수정: 둥근 부분이 텍스트 쪽을 향하도록) */}
        <div 
          style={{
            position: 'absolute',
            [isLeft ? 'left' : 'right']: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: circleSize,
            height: circleSize,
            borderRadius: isLeft ? '0 50% 50% 0' : '50% 0 0 50%', // 마스킹 방향 반대로 변경
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {image ? (
            <div style={{ 
              position: 'absolute',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}>
              <img
                src={image}
                alt="배너 이미지"
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition,
                }}
                onError={(e) => {
                  console.error("이미지 로드 오류:", e);
                  alert("이미지를 불러오는 중 오류가 발생했습니다.");
                }}
              />
            </div>
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px dashed #cccccc',
              borderRadius: isLeft ? '0 50% 50% 0' : '50% 0 0 50%',
            }}>
              <span style={{ 
                color: '#bbbbbb', 
                fontSize: '0.9rem', 
                textAlign: 'center',
                paddingLeft: isLeft ? '50px' : '0',
                paddingRight: isLeft ? '0' : '50px',
              }}>이미지를 선택해주세요</span>
            </div>
          )}
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