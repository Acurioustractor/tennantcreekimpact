<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tennant Creek Community Voices</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        header {
            text-align: center;
            margin-bottom: 4rem;
            animation: fadeInDown 1s ease-out;
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #ff6b6b, #ffd93d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .subtitle {
            font-size: 1.2rem;
            color: #a8dadc;
            margin-bottom: 0.5rem;
        }
        
        .sentiment-badge {
            display: inline-block;
            background: #4ecdc4;
            padding: 0.5rem 1.5rem;
            border-radius: 25px;
            font-weight: bold;
            margin-top: 1rem;
        }
        
        /* Theme Visualization */
        .theme-cloud {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 4rem;
            animation: fadeIn 1s ease-out 0.5s both;
        }
        
        .theme-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
        }
        
        .theme-card:hover {
            transform: translateY(-5px);
            border-color: #4ecdc4;
            background: rgba(255, 255, 255, 0.15);
        }
        
        .theme-card h3 {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
            text-transform: capitalize;
        }
        
        .theme-count {
            font-size: 2.5rem;
            font-weight: bold;
            color: #ffd93d;
        }
        
        .theme-bar {
            height: 5px;
            background: #4ecdc4;
            margin-top: 1rem;
            border-radius: 3px;
            transition: width 1s ease-out;
        }
        
        /* Impact Flow Visualization */
        .impact-flow {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 4rem;
            animation: fadeIn 1s ease-out 1s both;
        }
        
        .impact-flow h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: #ffd93d;
        }
        
        .flow-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2rem;
            flex-wrap: wrap;
        }
        
        .flow-level {
            flex: 1;
            min-width: 200px;
            text-align: center;
        }
        
        .flow-level h3 {
            color: #4ecdc4;
            margin-bottom: 1rem;
        }
        
        .flow-item {
            background: rgba(78, 205, 196, 0.2);
            padding: 0.8rem;
            margin: 0.5rem 0;
            border-radius: 10px;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .flow-item:hover {
            background: rgba(78, 205, 196, 0.4);
            transform: scale(1.05);
        }
        
        .flow-arrow {
            font-size: 2rem;
            color: #4ecdc4;
            animation: pulse 2s infinite;
        }
        
        /* Voice Quotes */
        .voices-section {
            margin-bottom: 4rem;
            animation: fadeIn 1s ease-out 1.5s both;
        }
        
        .voices-section h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: #ffd93d;
        }
        
        .voice-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .voice-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            border-radius: 15px;
            padding: 1.5rem;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .voice-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(78, 205, 196, 0.3);
        }
        
        .voice-quote {
            font-style: italic;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .voice-author {
            color: #4ecdc4;
            font-weight: bold;
            text-align: right;
        }
        
        .quote-mark {
            font-size: 3rem;
            color: rgba(78, 205, 196, 0.3);
            position: absolute;
            top: 0;
            left: 10px;
            font-family: Georgia, serif;
        }
        
        /* Action Framework */
        .action-framework {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 4rem;
            animation: fadeIn 1s ease-out 2s both;
        }
        
        .action-framework h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: #ffd93d;
        }
        
        .stakeholder-actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .stakeholder-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 1.5rem;
            border: 2px solid rgba(78, 205, 196, 0.5);
        }
        
        .stakeholder-card h3 {
            color: #4ecdc4;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .action-item {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .action-item:before {
            content: "→";
            position: absolute;
            left: 0;
            color: #ffd93d;
        }
        
        /* Journey Arc */
        .journey-arc {
            text-align: center;
            margin-bottom: 4rem;
            animation: fadeIn 1s ease-out 2.5s both;
        }
        
        .journey-arc h2 {
            color: #ffd93d;
            margin-bottom: 2rem;
        }
        
        .timeline {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 2rem 0;
            position: relative;
            padding: 2rem 0;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(to right, #ff6b6b, #ffd93d, #4ecdc4);
            z-index: -1;
        }
        
        .timeline-item {
            background: #1a1a2e;
            padding: 1.5rem;
            border-radius: 15px;
            border: 3px solid;
            flex: 1;
            margin: 0 1rem;
            transition: all 0.3s ease;
        }
        
        .timeline-item:hover {
            transform: scale(1.05);
        }
        
        .timeline-item.past {
            border-color: #ff6b6b;
        }
        
        .timeline-item.present {
            border-color: #ffd93d;
        }
        
        .timeline-item.future {
            border-color: #4ecdc4;
        }
        
        .timeline-item h3 {
            margin-bottom: 0.5rem;
        }
        
        .timeline-item p {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        /* Core Insight */
        .core-insight {
            background: linear-gradient(135deg, rgba(78, 205, 196, 0.2), rgba(255, 217, 61, 0.2));
            border-radius: 20px;
            padding: 3rem;
            text-align: center;
            margin-bottom: 2rem;
            animation: fadeIn 1s ease-out 3s both;
        }
        
        .core-insight h2 {
            color: #ffd93d;
            margin-bottom: 1rem;
        }
        
        .insight-text {
            font-size: 1.3rem;
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto;
        }
        
        /* Animations */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            h1 {
                font-size: 2rem;
            }
            
            .flow-container {
                flex-direction: column;
            }
            
            .flow-arrow {
                transform: rotate(90deg);
            }
            
            .timeline {
                flex-direction: column;
            }
            
            .timeline::before {
                top: 0;
                bottom: 0;
                left: 50%;
                width: 3px;
                height: auto;
                background: linear-gradient(to bottom, #ff6b6b, #ffd93d, #4ecdc4);
            }
            
            .timeline-item {
                margin: 1rem 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Tennant Creek Community Voices</h1>
            <p class="subtitle">A Story of Resilience, Innovation, and Hope</p>
            <div class="sentiment-badge">Overall Sentiment: POSITIVE WITH HOPE (59%)</div>
        </header>
        
        <!-- Theme Visualization -->
        <section class="theme-cloud">
            <div class="theme-card">
                <h3>Housing</h3>
                <div class="theme-count">99</div>
                <div class="theme-bar" style="width: 100%"></div>
            </div>
            <div class="theme-card">
                <h3>Community</h3>
                <div class="theme-count">63</div>
                <div class="theme-bar" style="width: 64%"></div>
            </div>
            <div class="theme-card">
                <h3>Culture</h3>
                <div class="theme-count">61</div>
                <div class="theme-bar" style="width: 62%"></div>
            </div>
            <div class="theme-card">
                <h3>Youth</h3>
                <div class="theme-count">43</div>
                <div class="theme-bar" style="width: 43%"></div>
            </div>
            <div class="theme-card">
                <h3>Dignity</h3>
                <div class="theme-count">37</div>
                <div class="theme-bar" style="width: 37%"></div>
            </div>
            <div class="theme-card">
                <h3>Partnership</h3>
                <div class="theme-count">23</div>
                <div class="theme-bar" style="width: 23%"></div>
            </div>
        </section>
        
        <!-- Impact Flow -->
        <section class="impact-flow">
            <h2>Impact Flow: From Individual to Systemic Change</h2>
            <div class="flow-container">
                <div class="flow-level">
                    <h3>Individual</h3>
                    <div class="flow-item">Better sleep</div>
                    <div class="flow-item">Health improvements</div>
                    <div class="flow-item">Dignity restored</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-level">
                    <h3>Family</h3>
                    <div class="flow-item">Safe spaces for children</div>
                    <div class="flow-item">Cultural transmission</div>
                    <div class="flow-item">Reduced stress</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-level">
                    <h3>Community</h3>
                    <div class="flow-item">Shared learning</div>
                    <div class="flow-item">Collective strength</div>
                    <div class="flow-item">Cultural revival</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-level">
                    <h3>Systemic</h3>
                    <div class="flow-item">New housing models</div>
                    <div class="flow-item">Partnership approaches</div>
                    <div class="flow-item">Policy influence</div>
                </div>
            </div>
        </section>
        
        <!-- Voice Quotes -->
        <section class="voices-section">
            <h2>Voices from the Community</h2>
            <div class="voice-grid">
                <div class="voice-card">
                    <span class="quote-mark">"</span>
                    <p class="voice-quote">Healthy homes is the start of everything. You need to have a home that you can call home and that you're happy with.</p>
                    <p class="voice-author">- Georgina Byron AM</p>
                </div>
                <div class="voice-card">
                    <span class="quote-mark">"</span>
                    <p class="voice-quote">We've never been asked what sort of house we'd like to live in. So this is a really exciting time.</p>
                    <p class="voice-author">- Linda Turner (LT)</p>
                </div>
                <div class="voice-card">
                    <span class="quote-mark">"</span>
                    <p class="voice-quote">I wanna have a cultural area, cultural center, and a youth center where kids can do their homework if they're not going to school.</p>
                    <p class="voice-author">- Dianne Stokes</p>
                </div>
                <div class="voice-card">
                    <span class="quote-mark">"</span>
                    <p class="voice-quote">This one is gonna be for all aboriginal people. Not only for us here today in Tennant Creek, it's for everybody.</p>
                    <p class="voice-author">- Norman Frank</p>
                </div>
                <div class="voice-card">
                    <span class="quote-mark">"</span>
                    <p class="voice-quote">You're here to help us, not use us up, but you're here to help us and support us as we go along.</p>
                    <p class="voice-author">- Patricia Frank</p>
                </div>
                <div class="voice-card">
                    <span class="quote-mark">"</span>
                    <p class="voice-quote">It's better here. At house. In the house. I'm gonna stay here for so long, not gonna move out. I like it here.</p>
                    <p class="voice-author">- Risilda Hogan</p>
                </div>
            </div>
        </section>
        
        <!-- Journey Arc -->
        <section class="journey-arc">
            <h2>Community Journey: Past → Present → Future</h2>
            <div class="timeline">
                <div class="timeline-item past">
                    <h3>Past</h3>
                    <p>Harsh conditions, systemic exclusion, cultural disruption</p>
                </div>
                <div class="timeline-item present">
                    <h3>Present</h3>
                    <p>Community-led innovation, partnership building, hope emerging</p>
                </div>
                <div class="timeline-item future">
                    <h3>Future</h3>
                    <p>Culturally appropriate solutions, youth empowerment, systemic change</p>
                </div>
            </div>
        </section>
        
        <!-- Action Framework -->
        <section class="action-framework">
            <h2>Action Framework for Stakeholders</h2>
            <div class="stakeholder-actions">
                <div class="stakeholder-card">
                    <h3>For Philanthropists</h3>
                    <div class="action-item">Fund culturally appropriate housing</div>
                    <div class="action-item">Support community-led initiatives</div>
                    <div class="action-item">Make long-term commitments</div>
                    <div class="action-item">Back local entrepreneurs</div>
                </div>
                <div class="stakeholder-card">
                    <h3>For Organizations</h3>
                    <div class="action-item">Listen first, design WITH not FOR</div>
                    <div class="action-item">Focus on practical solutions</div>
                    <div class="action-item">Respect cultural protocols</div>
                    <div class="action-item">Build genuine partnerships</div>
                </div>
                <div class="stakeholder-card">
                    <h3>For Government</h3>
                    <div class="action-item">Recognize housing as a human right</div>
                    <div class="action-item">Ensure funding reaches ground level</div>
                    <div class="action-item">Support culturally appropriate design</div>
                    <div class="action-item">Enable community ownership</div>
                </div>
            </div>
        </section>
        
        <!-- Core Insight -->
        <section class="core-insight">
            <h2>Transformative Potential</h2>
            <p class="insight-text">
                This community demonstrates extraordinary resilience and vision. The convergence of cultural strength, practical innovation, and ethical partnership creates a powerful model for systemic change.
                <br><br>
                <strong>The simple act of asking "What kind of house would you like?" represents a revolutionary shift in power dynamics.</strong>
            </p>
        </section>
    </div>
    
    <script>
        // Animate theme bars on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.theme-bar');
                    bars.forEach(bar => {
                        bar.style.transition = 'width 1s ease-out';
                    });
                }
            });
        });
        
        const themeCloud = document.querySelector('.theme-cloud');
        if (themeCloud) {
            observer.observe(themeCloud);
        }
        
        // Add hover effects to cards
        document.querySelectorAll('.voice-card, .stakeholder-card, .theme-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(78, 205, 196, 0.15), rgba(255, 255, 255, 0.05))`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.background = '';
            });
        });
    </script>
</body>
</html>