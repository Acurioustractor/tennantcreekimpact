<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tennant Creek Community Connection Network</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background: #0a0a0a;
            color: #fff;
            overflow: hidden;
        }
        
        #network {
            width: 100vw;
            height: 100vh;
            position: relative;
        }
        
        .info-panel {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(26, 26, 46, 0.95);
            padding: 2rem;
            border-radius: 15px;
            max-width: 350px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(78, 205, 196, 0.3);
            z-index: 1000;
        }
        
        .info-panel h1 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #ff6b6b, #ffd93d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .info-panel p {
            font-size: 0.9rem;
            line-height: 1.6;
            opacity: 0.9;
            margin-bottom: 1rem;
        }
        
        .legend {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .legend h3 {
            font-size: 1rem;
            margin-bottom: 0.5rem;
            color: #4ecdc4;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            margin: 0.5rem 0;
            font-size: 0.85rem;
        }
        
        .legend-circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 10px;
        }
        
        .tooltip {
            position: absolute;
            background: rgba(26, 26, 46, 0.95);
            padding: 1rem;
            border-radius: 10px;
            font-size: 0.9rem;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
            max-width: 300px;
            border: 1px solid rgba(78, 205, 196, 0.5);
            z-index: 1001;
        }
        
        .tooltip.visible {
            opacity: 1;
        }
        
        .stats {
            position: absolute;
            bottom: 20px;
            right: 20px;
            background: rgba(26, 26, 46, 0.95);
            padding: 1.5rem;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(78, 205, 196, 0.3);
        }
        
        .stat-item {
            margin: 0.5rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .stat-value {
            font-size: 1.2rem;
            font-weight: bold;
            color: #ffd93d;
        }
        
        canvas {
            display: block;
        }
        
        .controls {
            position: absolute;
            bottom: 20px;
            left: 20px;
            display: flex;
            gap: 10px;
            z-index: 1000;
        }
        
        .control-btn {
            background: rgba(78, 205, 196, 0.2);
            border: 1px solid #4ecdc4;
            color: #4ecdc4;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.9rem;
        }
        
        .control-btn:hover {
            background: rgba(78, 205, 196, 0.4);
            transform: translateY(-2px);
        }
        
        .control-btn.active {
            background: #4ecdc4;
            color: #0a0a0a;
        }
    </style>
</head>
<body>
    <div id="network">
        <canvas id="networkCanvas"></canvas>
        
        <div class="info-panel">
            <h1>Community Connection Network</h1>
            <p>This visualization shows the interconnected themes, voices, and actions from Tennant Creek community members.</p>
            <p>Click and drag to explore. Hover over nodes for details.</p>
            
            <div class="legend">
                <h3>Node Types</h3>
                <div class="legend-item">
                    <div class="legend-circle" style="background: #ff6b6b;"></div>
                    <span>Community Members</span>
                </div>
                <div class="legend-item">
                    <div class="legend-circle" style="background: #4ecdc4;"></div>
                    <span>Core Themes</span>
                </div>
                <div class="legend-item">
                    <div class="legend-circle" style="background: #ffd93d;"></div>
                    <span>Actions & Solutions</span>
                </div>
                <div class="legend-item">
                    <div class="legend-circle" style="background: #a8dadc;"></div>
                    <span>Impact Areas</span>
                </div>
            </div>
        </div>
        
        <div class="stats">
            <div class="stat-item">
                <span class="stat-label">Voices:</span>
                <span class="stat-value">8</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Key Themes:</span>
                <span class="stat-value">10</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Actions:</span>
                <span class="stat-value">22</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Sentiment:</span>
                <span class="stat-value">59% ↑</span>
            </div>
        </div>
        
        <div class="controls">
            <button class="control-btn active" data-view="all">All Connections</button>
            <button class="control-btn" data-view="housing">Housing Focus</button>
            <button class="control-btn" data-view="culture">Culture Focus</button>
            <button class="control-btn" data-view="youth">Youth Focus</button>
        </div>
        
        <div class="tooltip"></div>
    </div>
    
    <script>
        // Create network visualization after DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            // Get canvas and context
            const canvas = document.getElementById('networkCanvas');
            const ctx = canvas.getContext('2d');
            const tooltip = document.querySelector('.tooltip');
            
            // Set canvas size
            function setCanvasSize() {
                canvas.width = window.innerWidth || 800;
                canvas.height = window.innerHeight || 600;
            }
            setCanvasSize();
            
            // Handle window resize
            window.addEventListener('resize', function() {
                setCanvasSize();
                // Re-center nodes after resize
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                networkData.nodes.forEach(node => {
                    if (node.x > canvas.width - 50) node.x = canvas.width - 50;
                    if (node.y > canvas.height - 50) node.y = canvas.height - 50;
                    if (node.x < 50) node.x = 50;
                    if (node.y < 50) node.y = 50;
                });
            });
            
            // Create the network data
            const networkData = {
                nodes: [
                    // People (red)
                    {id: 'georgina', label: 'Georgina Byron AM', type: 'person', x: 0, y: 0, vx: 0, vy: 0, description: 'CEO Snow Foundation - "Healthy homes is the start of everything"'},
                    {id: 'dianne', label: 'Dianne Stokes', type: 'person', x: 0, y: 0, vx: 0, vy: 0, description: 'Traditional owner - "I want a cultural center and youth center"'},
                    {id: 'risilda', label: 'Risilda Hogan', type: 'person', x: 0, y: 0, vx: 0, vy: 0, description: 'Mother of five - "It\'s better here. In the house"'},
                    {id: 'cliff', label: 'Cliff Plummer', type: 'person', x: 0, y: 0, vx: 0, vy: 0, description: 'Health practitioner - "I like helping people"'},
                    {id: 'linda', label: 'Linda Turner (LT)', type: 'person', x: 0, y: 0, vx: 0, vy: 0, description: 'Cultural tourism entrepreneur - "We\'ve never been asked"'},
                    {id: 'norman', label: 'Norman Frank', type: 'person', x: 0, y: 0, vx: 0, vy: 0, description: 'Willy Gunter founder - "Standing strong together"'},
                    {id: 'patricia', label: 'Patricia Frank', type: 'person', x: 0, y: 0, vx: 0, vy: 0, description: 'Health worker - "You\'re here to help us, not use us"'},
                    {id: 'annie', label: 'Annie Morrison', type: 'person', x: 0, y: 0, vx: 0, vy: 0, description: 'Elder - "Helping all the people"'},
                    
                    // Themes (teal)
                    {id: 'housing', label: 'Housing', type: 'theme', x: 0, y: 0, vx: 0, vy: 0, description: 'Central theme: 99 mentions'},
                    {id: 'culture', label: 'Culture', type: 'theme', x: 0, y: 0, vx: 0, vy: 0, description: 'Core identity: 61 mentions'},
                    {id: 'community', label: 'Community', type: 'theme', x: 0, y: 0, vx: 0, vy: 0, description: 'Collective strength: 63 mentions'},
                    {id: 'youth', label: 'Youth', type: 'theme', x: 0, y: 0, vx: 0, vy: 0, description: 'Future focus: 43 mentions'},
                    {id: 'dignity', label: 'Dignity', type: 'theme', x: 0, y: 0, vx: 0, vy: 0, description: 'Human worth: 37 mentions'},
                    
                    // Actions (yellow)
                    {id: 'cultHouse', label: 'Culturally Appropriate Housing', type: 'action', x: 0, y: 0, vx: 0, vy: 0, description: 'Community-designed homes'},
                    {id: 'youthCenter', label: 'Youth Centers', type: 'action', x: 0, y: 0, vx: 0, vy: 0, description: 'Safe spaces for learning'},
                    {id: 'partnership', label: 'True Partnership', type: 'action', x: 0, y: 0, vx: 0, vy: 0, description: 'Working WITH not FOR'},
                    {id: 'simpleSol', label: 'Simple Solutions', type: 'action', x: 0, y: 0, vx: 0, vy: 0, description: 'Beds, washing machines'},
                    
                    // Impact (light blue)
                    {id: 'health', label: 'Health Impact', type: 'impact', x: 0, y: 0, vx: 0, vy: 0, description: 'Better sleep, reduced disease'},
                    {id: 'cultural', label: 'Cultural Revival', type: 'impact', x: 0, y: 0, vx: 0, vy: 0, description: 'Language and tradition preservation'},
                    {id: 'systemic', label: 'Systems Change', type: 'impact', x: 0, y: 0, vx: 0, vy: 0, description: 'New models for housing'},
                    {id: 'empowerment', label: 'Empowerment', type: 'impact', x: 0, y: 0, vx: 0, vy: 0, description: 'Community control and agency'}
                ],
                
                links: [
                    // People to themes
                    {source: 'georgina', target: 'housing', strength: 3},
                    {source: 'georgina', target: 'community', strength: 2},
                    {source: 'dianne', target: 'culture', strength: 3},
                    {source: 'dianne', target: 'youth', strength: 3},
                    {source: 'risilda', target: 'housing', strength: 3},
                    {source: 'cliff', target: 'community', strength: 2},
                    {source: 'linda', target: 'culture', strength: 3},
                    {source: 'linda', target: 'dignity', strength: 3},
                    {source: 'norman', target: 'housing', strength: 3},
                    {source: 'norman', target: 'culture', strength: 3},
                    {source: 'patricia', target: 'culture', strength: 3},
                    {source: 'patricia', target: 'community', strength: 2},
                    {source: 'annie', target: 'community', strength: 2},
                    
                    // Themes to actions
                    {source: 'housing', target: 'cultHouse', strength: 3},
                    {source: 'youth', target: 'youthCenter', strength: 3},
                    {source: 'community', target: 'partnership', strength: 3},
                    {source: 'dignity', target: 'simpleSol', strength: 2},
                    
                    // Actions to impacts
                    {source: 'cultHouse', target: 'health', strength: 2},
                    {source: 'cultHouse', target: 'systemic', strength: 3},
                    {source: 'youthCenter', target: 'cultural', strength: 2},
                    {source: 'partnership', target: 'empowerment', strength: 3},
                    {source: 'simpleSol', target: 'health', strength: 2}
                ],
                
                colors: {
                    person: '#ff6b6b',
                    theme: '#4ecdc4',
                    action: '#ffd93d',
                    impact: '#a8dadc'
                }
            };
            
            // Initialize node positions - arrange by type in layers
            const centerX = canvas.width / 2 || 400;
            const centerY = canvas.height / 2 || 300;
            let personIndex = 0, themeIndex = 0, actionIndex = 0, impactIndex = 0;
            
            networkData.nodes.forEach((node) => {
                let angle, radius;
                
                switch(node.type) {
                    case 'theme':
                        // Themes in the center
                        angle = (themeIndex++ / 5) * Math.PI * 2;
                        radius = 100;
                        break;
                    case 'person':
                        // People in inner ring
                        angle = (personIndex++ / 8) * Math.PI * 2;
                        radius = 250;
                        break;
                    case 'action':
                        // Actions in middle ring
                        angle = (actionIndex++ / 4) * Math.PI * 2 + 0.3;
                        radius = 180;
                        break;
                    case 'impact':
                        // Impacts in outer ring
                        angle = (impactIndex++ / 4) * Math.PI * 2 + 0.6;
                        radius = 320;
                        break;
                }
                
                node.x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 30;
                node.y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 30;
                node.vx = 0;
                node.vy = 0;
            });
            
            // Simulation state
            let mouseX = null;
            let mouseY = null;
            let draggedNode = null;
            let currentView = 'all';
            
            // Mouse event handlers
            canvas.addEventListener('mousedown', function(e) {
                const rect = canvas.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
                
                // Check if clicking on a node
                networkData.nodes.forEach(node => {
                    const dx = mouseX - node.x;
                    const dy = mouseY - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 30) {
                        draggedNode = node;
                    }
                });
            });
            
            canvas.addEventListener('mousemove', function(e) {
                const rect = canvas.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
                
                if (draggedNode) {
                    draggedNode.x = mouseX;
                    draggedNode.y = mouseY;
                    draggedNode.vx = 0;
                    draggedNode.vy = 0;
                }
                
                // Check for hover
                let hoveredNode = null;
                networkData.nodes.forEach(node => {
                    const dx = mouseX - node.x;
                    const dy = mouseY - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 30) {
                        hoveredNode = node;
                    }
                });
                
                if (hoveredNode) {
                    tooltip.innerHTML = `
                        <strong>${hoveredNode.label}</strong><br>
                        <small>${hoveredNode.type.charAt(0).toUpperCase() + hoveredNode.type.slice(1)}</small><br>
                        ${hoveredNode.description}
                    `;
                    tooltip.style.left = (mouseX + 10) + 'px';
                    tooltip.style.top = (mouseY - 10) + 'px';
                    tooltip.classList.add('visible');
                } else {
                    tooltip.classList.remove('visible');
                }
            });
            
            canvas.addEventListener('mouseup', function() {
                draggedNode = null;
            });
            
            canvas.addEventListener('mouseleave', function() {
                draggedNode = null;
                tooltip.classList.remove('visible');
            });
            
            // Control buttons
            document.querySelectorAll('.control-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentView = btn.dataset.view;
                });
            });
            
            // Animation function
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Apply physics
                networkData.nodes.forEach((node, i) => {
                    if (node === draggedNode) return;
                    
                    // Initialize velocity if undefined
                    if (node.vx === undefined) node.vx = 0;
                    if (node.vy === undefined) node.vy = 0;
                    
                    // Center force - different strength based on node type
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    let centerForce = 0.00005;
                    
                    // Adjust center force based on node type to maintain layers
                    switch(node.type) {
                        case 'theme':
                            centerForce = 0.0001; // Stronger pull to center
                            break;
                        case 'action':
                            centerForce = 0.00007;
                            break;
                        case 'person':
                            centerForce = 0.00003;
                            break;
                        case 'impact':
                            centerForce = 0.00002; // Weaker pull, stays on outside
                            break;
                    }
                    
                    node.vx += (centerX - node.x) * centerForce;
                    node.vy += (centerY - node.y) * centerForce;
                    
                    // Repulsion - gentler and with distance limits
                    networkData.nodes.forEach((other, j) => {
                        if (i === j) return;
                        const dx = node.x - other.x;
                        const dy = node.y - other.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 150 && dist > 5) {
                            const force = Math.min(20 / dist, 0.5);
                            node.vx += (dx / dist) * force;
                            node.vy += (dy / dist) * force;
                        }
                    });
                    
                    // Attraction along links - much gentler
                    networkData.links.forEach(link => {
                        if (link.source === node.id || link.target === node.id) {
                            const other = networkData.nodes.find(n => n.id === (link.source === node.id ? link.target : link.source));
                            if (other) {
                                const dx = other.x - node.x;
                                const dy = other.y - node.y;
                                const dist = Math.sqrt(dx * dx + dy * dy);
                                if (dist > 20) {
                                    // Gentle attraction for connected nodes
                                    const idealDist = 120;
                                    const force = Math.min((dist - idealDist) * 0.00005 * link.strength, 0.02);
                                    node.vx += dx * force;
                                    node.vy += dy * force;
                                }
                            }
                        }
                    });
                    
                    // Strong damping
                    node.vx *= 0.85;
                    node.vy *= 0.85;
                    
                    // Limit maximum velocity
                    const maxVel = 2;
                    node.vx = Math.max(-maxVel, Math.min(maxVel, node.vx));
                    node.vy = Math.max(-maxVel, Math.min(maxVel, node.vy));
                    
                    // Add tiny random movement to keep things dynamic
                    node.vx += (Math.random() - 0.5) * 0.01;
                    node.vy += (Math.random() - 0.5) * 0.01;
                    
                    // Update position
                    node.x += node.vx;
                    node.y += node.vy;
                    
                    // Keep within bounds with padding
                    const padding = 50;
                    node.x = Math.max(padding, Math.min(canvas.width - padding, node.x));
                    node.y = Math.max(padding, Math.min(canvas.height - padding, node.y));
                    
                    // If node hits boundary, reverse velocity
                    if (node.x <= padding || node.x >= canvas.width - padding) {
                        node.vx *= -0.5;
                    }
                    if (node.y <= padding || node.y >= canvas.height - padding) {
                        node.vy *= -0.5;
                    }
                });
                
                // Draw links
                networkData.links.forEach(link => {
                    const source = networkData.nodes.find(n => n.id === link.source);
                    const target = networkData.nodes.find(n => n.id === link.target);
                    
                    if (source && target) {
                        // Filter by view
                        if (currentView !== 'all') {
                            const viewMatch = 
                                source.label.toLowerCase().includes(currentView) ||
                                target.label.toLowerCase().includes(currentView) ||
                                link.source.includes(currentView) ||
                                link.target.includes(currentView);
                            
                            if (!viewMatch) return;
                        }
                        
                        ctx.beginPath();
                        ctx.moveTo(source.x, source.y);
                        ctx.lineTo(target.x, target.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * link.strength})`;
                        ctx.lineWidth = link.strength;
                        ctx.stroke();
                    }
                });
                
                // Draw nodes
                networkData.nodes.forEach(node => {
                    // Check if node should be highlighted based on view
                    let opacity = 1;
                    if (currentView !== 'all') {
                        const isRelevant = node.label.toLowerCase().includes(currentView) ||
                                         node.id.includes(currentView) ||
                                         networkData.links.some(link => 
                                           (link.source === node.id || link.target === node.id) &&
                                           (link.source.includes(currentView) || link.target.includes(currentView))
                                         );
                        opacity = isRelevant ? 1 : 0.3;
                    }
                    
                    // Node circle
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.type === 'theme' ? 35 : 25, 0, Math.PI * 2);
                    ctx.fillStyle = networkData.colors[node.type] + (opacity === 1 ? 'ff' : '4d');
                    ctx.fill();
                    
                    // Glow
                    if (opacity === 1) {
                        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 40);
                        gradient.addColorStop(0, networkData.colors[node.type] + '40');
                        gradient.addColorStop(1, 'transparent');
                        ctx.fillStyle = gradient;
                        ctx.fill();
                    }
                    
                    // Label
                    ctx.fillStyle = opacity === 1 ? '#fff' : '#ffffff80';
                    ctx.font = node.type === 'theme' ? 'bold 12px Arial' : '11px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    
                    const words = node.label.split(' ');
                    if (words.length > 2) {
                        ctx.fillText(words.slice(0, 2).join(' '), node.x, node.y - 5);
                        ctx.fillText(words.slice(2).join(' '), node.x, node.y + 5);
                    } else {
                        ctx.fillText(node.label, node.x, node.y);
                    }
                });
                
                requestAnimationFrame(animate);
            }
            
            // Start animation
            animate();
        });
    </script>
</body>
</html>