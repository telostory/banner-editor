'use client';

export default function Controls({
  bannerConfig,
  templates,
  colors,
  fonts,
  onImageUpload,
  onTemplateChange,
  onColorChange,
  onTextChange,
  onFontChange,
  onImagePositionChange,
  onDownload,
  onRegisterMaterial
}) {
  const { template, image } = bannerConfig;
  
  // 이미지가 있는 경우에만 슬라이더 표시 (모든 템플릿 타입에 적용)
  const showImagePositionSlider = image !== null;

  return (
    <div className="controls">
      <div className="control-section">
        <h2>템플릿</h2>
        <div className="template-grid">
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              className={`template-item ${tmpl.id === template.id ? 'selected' : ''}`}
              onClick={() => onTemplateChange(tmpl)}
            >
              <div className="template-preview" style={{ backgroundColor: bannerConfig.backgroundColor }}>
                {tmpl.imageStyle === 'rounded' ? (
                  <div className={`rounded-indicator ${tmpl.imagePosition}-indicator`}></div>
                ) : (
                  <div className={`semicircle-indicator ${tmpl.imagePosition}-indicator`}></div>
                )}
              </div>
              <span style={{ marginLeft: '8px', color: '#999999', fontSize: '0.9rem' }}>
                {tmpl.imagePosition === 'left' ? '왼쪽' : '오른쪽'} {tmpl.imageStyle === 'rounded' ? '사각형' : '반원형'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="control-section">
        <h2>배경 색상</h2>
        <div className="color-grid">
          {colors.map((color) => (
            <div
              key={color}
              className={`color-item ${color === bannerConfig.backgroundColor ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>

      <div className="control-section">
        <h2>폰트</h2>
        <div className="font-selection">
          {fonts.map((font) => (
            <div
              key={font.id}
              className={`font-item ${font.id === bannerConfig.font.id ? 'selected' : ''}`}
              onClick={() => onFontChange(font)}
            >
              <div className={`font-preview ${font.className}`}>{font.name}</div>
            </div>
          ))}
        </div>
      </div>

      {showImagePositionSlider && (
        <div className="control-section">
          <h2>이미지 위치 조정</h2>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={bannerConfig.imagePositionX}
              onChange={(e) => onImagePositionChange(parseInt(e.target.value))}
              className="position-slider"
            />
            <div className="slider-labels">
              <span>왼쪽</span>
              <span>오른쪽</span>
            </div>
          </div>
        </div>
      )}

      <div className="control-section">
        <h2>텍스트</h2>
        <div className="text-inputs">
          <div className="input-group">
            <label>타이틀</label>
            <input 
              type="text" 
              value={bannerConfig.title}
              onChange={(e) => onTextChange('title', e.target.value)}
              placeholder="타이틀을 입력하세요"
            />
          </div>
          <div className="input-group">
            <label>서브타이틀</label>
            <input 
              type="text" 
              value={bannerConfig.subtitle}
              onChange={(e) => onTextChange('subtitle', e.target.value)}
              placeholder="서브타이틀을 입력하세요"
            />
          </div>
        </div>
      </div>

      <div className="control-section">
        <h2>이미지</h2>
        <div className="image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            id="image-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload" className="upload-button">
            이미지 업로드
          </label>
          {bannerConfig.image && (
            <span className="image-status">이미지가 업로드됨</span>
          )}
        </div>
      </div>

      <div className="control-section">
        <div className="button-group">
          <button onClick={onDownload} className="download-button">
            다운로드
          </button>
          <button onClick={onRegisterMaterial} className="register-button">
            소재에 등록
          </button>
        </div>
      </div>
    </div>
  );
} 