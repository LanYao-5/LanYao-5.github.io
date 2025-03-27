/**
 * 主脚本文件 - LanYao-5个人网站
 * 实现粒子效果、视差滚动和动态交互
 * 作者: LanYao-5
 * 创建日期: 2023
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化粒子效果
    initParticles();
    
    // 初始化视差滚动
    initParallaxEffect();
    
    // 初始化进入视口动画
    initInViewAnimation();
    
    // 初始化技能图表
    initSkillsChart();
    
    // 初始化表单验证
    initFormValidation();
});

/**
 * 初始化粒子效果
 * 在Canvas上创建动态粒子效果
 * 密度: 0.3/px²
 */
function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // 设置Canvas尺寸为窗口大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // 重新生成粒子
        generateParticles();
    }
    
    // 生成粒子
    function generateParticles() {
        particles = [];
        
        // 计算粒子数量 (密度0.3/px²)
        const area = canvas.width * canvas.height;
        const particleCount = Math.floor(area * 0.0003); // 0.3/1000px²
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                color: Math.random() > 0.5 ? 'rgba(3, 102, 252, 0.8)' : 'rgba(252, 3, 248, 0.8)',
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25
            });
        }
    }
    
    // 绘制粒子
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // 更新粒子位置
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // 边界检查
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });
        
        requestAnimationFrame(drawParticles);
    }
    
    // 初始化
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();
}

/**
 * 初始化视差滚动效果
 * 实现Apple式视差滚动
 */
function initParallaxEffect() {
    const sections = document.querySelectorAll('section');
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // 为每个部分添加视差效果
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // 检查部分是否在视口中
            if (scrollY > sectionTop - window.innerHeight && 
                scrollY < sectionTop + sectionHeight) {
                
                // 计算视差偏移
                const offset = (scrollY - sectionTop) * 0.1;
                
                // 应用变换
                section.style.transform = `translateZ(0) translateY(${offset}px)`;
                
                // 添加进入动画类
                section.classList.add('parallax-section');
                
                // 为子元素添加淡入效果
                const fadeElements = section.querySelectorAll('.fade-in');
                fadeElements.forEach(el => {
                    if (isElementInViewport(el)) {
                        el.classList.add('visible');
                    }
                });
            }
        });
    });
    
    // 初始触发一次滚动事件
    window.dispatchEvent(new Event('scroll'));
}

/**
 * 检查元素是否在视口中
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

/**
 * 初始化进入视口时的动画
 */
function initInViewAnimation() {
    // 添加淡入类到需要动画的元素
    const animatedElements = document.querySelectorAll('.skills__category, .projects__card, .contact__form-group');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // 初始检查
    checkElementsInView();
    
    // 监听滚动事件
    window.addEventListener('scroll', checkElementsInView);
    
    function checkElementsInView() {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }
}

/**
 * 初始化技能图表
 * 创建SVG线框图表
 */
function initSkillsChart() {
    const chartContainer = document.querySelector('.skills__chart');
    if (!chartContainer) return;
    
    // 创建SVG元素
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 300 300');
    svg.style.overflow = 'visible';
    
    // 技能数据
    const skills = [
        { name: '前端开发', value: 0.9, angle: 0 },
        { name: '后端技术', value: 0.75, angle: 72 },
        { name: 'UI设计', value: 0.8, angle: 144 },
        { name: '数据分析', value: 0.7, angle: 216 },
        { name: '项目管理', value: 0.85, angle: 288 }
    ];
    
    // 图表中心点
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    
    // 创建多边形轮廓
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    let polygonPoints = '';
    
    skills.forEach(skill => {
        const angle = skill.angle * Math.PI / 180;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        polygonPoints += `${x},${y} `;
    });
    
    polygon.setAttribute('points', polygonPoints);
    polygon.setAttribute('fill', 'none');
    polygon.setAttribute('stroke', 'rgba(3, 102, 252, 0.3)');
    polygon.setAttribute('stroke-width', '1');
    svg.appendChild(polygon);
    
    // 创建内部技能多边形
    const skillPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    let skillPoints = '';
    
    skills.forEach(skill => {
        const angle = skill.angle * Math.PI / 180;
        const x = centerX + radius * skill.value * Math.cos(angle);
        const y = centerY + radius * skill.value * Math.sin(angle);
        skillPoints += `${x},${y} `;
    });
    
    skillPolygon.setAttribute('points', skillPoints);
    skillPolygon.setAttribute('fill', 'rgba(252, 3, 248, 0.1)');
    skillPolygon.setAttribute('stroke', 'rgba(3, 102, 252, 0.8)');
    skillPolygon.setAttribute('stroke-width', '2');
    svg.appendChild(skillPolygon);
    
    // 添加轴线和标签
    skills.forEach(skill => {
        const angle = skill.angle * Math.PI / 180;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // 轴线
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
        
        // 标签
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const labelX = centerX + (radius + 20) * Math.cos(angle);
        const labelY = centerY + (radius + 20) * Math.sin(angle);
        text.setAttribute('x', labelX);
        text.setAttribute('y', labelY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'rgba(255, 255, 255, 0.8)');
        text.setAttribute('font-size', '12');
        text.textContent = skill.name;
        svg.appendChild(text);
        
        // 技能点
        const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const pointX = centerX + radius * skill.value * Math.cos(angle);
        const pointY = centerY + radius * skill.value * Math.sin(angle);
        point.setAttribute('cx', pointX);
        point.setAttribute('cy', pointY);
        point.setAttribute('r', '4');
        point.setAttribute('fill', 'rgba(3, 102, 252, 1)');
        svg.appendChild(point);
    });
    
    // 添加到容器
    chartContainer.appendChild(svg);
}

/**
 * 初始化表单验证
 */
function initFormValidation() {
    const contactForm = document.querySelector('.contact__form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单字段
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // 简单验证
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            highlightError(nameInput);
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            highlightError(emailInput);
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        if (!messageInput.value.trim()) {
            highlightError(messageInput);
            isValid = false;
        } else {
            removeError(messageInput);
        }
        
        // 如果验证通过，显示成功消息
        if (isValid) {
            // 在实际应用中，这里会发送表单数据到服务器
            // 这里仅模拟成功提交
            const submitButton = contactForm.querySelector('.contact__submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = '发送成功！';
            submitButton.style.backgroundColor = 'var(--color-primary)';
            
            // 重置表单
            contactForm.reset();
            
            // 3秒后恢复按钮状态
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
            }, 3000);
        }
    });
    
    // 辅助函数：高亮错误字段
    function highlightError(input) {
        input.style.borderColor = 'red';
        input.style.backgroundColor = 'rgba(255, 0, 0, 0.05)';
    }
    
    // 辅助函数：移除错误高亮
    function removeError(input) {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
    }
    
    // 辅助函数：验证邮箱格式
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 添加输入事件监听器，在用户输入时移除错误高亮
    const inputs = contactForm.querySelectorAll('.contact__input, .contact__textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            removeError(input);
        });
    });
}