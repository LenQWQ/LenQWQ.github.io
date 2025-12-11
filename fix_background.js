// 保存到 C:\Users\29726\Desktop\MyBlog\fix_background.js
const fs = require('fs');
const path = require('path');

const themePath = path.join(__dirname, 'node_modules/hexo-theme-butterfly');

// 1. 修改主题的CSS文件
const cssFiles = [
  'source/css/_layout/post.styl',
  'source/css/_layout/page.styl',
  'source/css/style.styl'
];

cssFiles.forEach(cssFile => {
  const fullPath = path.join(themePath, cssFile);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // 添加强制覆盖规则
    const fixCSS = `
/* ====== BACKGROUND FIX ====== */
#page-header.post-bg {
  background: url('/picture/background.jpg') no-repeat center center !important;
  background-size: cover !important;
  height: 400px !important;
}

#page-header.post-bg:before {
  background: rgba(0, 0, 0, 0.3) !important;
}`;
    
    if (!content.includes('BACKGROUND FIX')) {
      fs.writeFileSync(fullPath, content + fixCSS);
      console.log(`✅ 已修复: ${cssFile}`);
    }
  }
});

// 2. 修改模板文件
const pugFiles = [
  'layout/includes/post/post-bg.pug',
  'layout/page.pug',
  'layout/post.pug'
];

pugFiles.forEach(pugFile => {
  const fullPath = path.join(themePath, pugFile);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // 在post-bg元素中添加内联样式
    if (content.includes('post-bg')) {
      content = content.replace(
        /\.post-bg\([^)]*\)/g,
        `.post-bg(style="background: url('/picture/background.jpg') no-repeat center center; background-size: cover; height: 400px;")`
      );
      fs.writeFileSync(fullPath, content);
      console.log(`✅ 已修复: ${pugFile}`);
    }
  }
});

console.log('🎉 修复完成！请重新运行: hexo clean && hexo g && hexo s');