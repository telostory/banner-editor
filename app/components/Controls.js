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
  onDownload,
}) {
  return (
    <div className="controls">
      <h2>배너 설정</h2>
      
      <div className="control-group">
        <h3>이미지 업로드</h3>
        <input
          type="file"
          id="banner-image"
          className="file-input"
          accept="image/*"
          onChange={onImageUpload}
        />
        <label htmlFor="banner-image" className="file-label">
          이미지 선택
        </label>
        {bannerConfig.image && <span> 선택됨</span>}
      </div>
      
      <div className="control-group">
        <h3>텍스트</h3>
        <input
          type="text"
          className="text-input"
          placeholder="제목"
          value={bannerConfig.title}
          onChange={(e) => onTextChange('title', e.target.value)}
        />
        <input
          type="text"
          className="text-input"
          placeholder="부제목"
          value={bannerConfig.subtitle}
          onChange={(e) => onTextChange('subtitle', e.target.value)}
        />
      </div>
      
      <div className="control-group">
        <h3>폰트</h3>
        <div className="font-options">
          {fonts.map((font) => (
            <div
              key={font.id}
              className={`font-option ${bannerConfig.font.id === font.id ? 'active' : ''} ${font.className}`}
              onClick={() => onFontChange(font)}
            >
              {font.name}
            </div>
          ))}
        </div>
      </div>
      
      <div className="control-group">
        <h3>템플릿</h3>
        <div className="template-options">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`template-option ${bannerConfig.template.id === template.id ? 'active' : ''}`}
              onClick={() => onTemplateChange(template)}
            >
              {template.name}
            </div>
          ))}
        </div>
      </div>
      
      <div className="control-group">
        <h3>배경 색상</h3>
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className={`color-option ${bannerConfig.backgroundColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="buttons">
        <button className="button" onClick={onDownload}>
          다운로드
        </button>
      </div>
    </div>
  );
} 