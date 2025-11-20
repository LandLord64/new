import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, MessageCircle, Play, Pause, ChevronRight, Check, Volume2, VolumeX, Mic, Send, TrendingUp, Calendar, Award, Users } from 'lucide-react';

const KnowledgeCompanion = () => {
  const [activeView, setActiveView] = useState('auth');
  const [currentDay, setCurrentDay] = useState(1);
  const [wonderProgress, setWonderProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedWonders, setCompletedWonders] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [assessmentMode, setAssessmentMode] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [articulationScore, setArticulationScore] = useState(null);
  const [reviewSchedule, setReviewSchedule] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [referralCode, setReferralCode] = useState('');
  const [showReferral, setShowReferral] = useState(false);

  // Load state from storage on mount
  useEffect(() => {
    const loadUserState = async () => {
      try {
        const authResult = await window.storage.get('user_authenticated');
        const emailResult = await window.storage.get('user_email');
        const completedResult = await window.storage.get('completed_wonders');
        const scheduleResult = await window.storage.get('review_schedule');
        const scoreResult = await window.storage.get('articulation_scores');
        
        if (authResult?.value === 'true' && emailResult?.value) {
          setIsAuthenticated(true);
          setUserEmail(emailResult.value);
          setActiveView('wonder');
          
          if (completedResult?.value) {
            setCompletedWonders(JSON.parse(completedResult.value));
          }
          
          if (scheduleResult?.value) {
            setReviewSchedule(JSON.parse(scheduleResult.value));
          }
          
          if (scoreResult?.value) {
            const scores = JSON.parse(scoreResult.value);
            const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
            setArticulationScore(Math.round(avgScore));
          }
        }
      } catch (error) {
        console.log('No existing user state');
      }
    };
    
    loadUserState();
  }, []);

  const wondersData = {
    1: {
      title: "What if time stopped at the edge of a black hole?",
      domain: "physics",
      hook: "At the event horizon, time dilation approaches infinity",
      coreInsight: "When a star collapses into a black hole, gravity becomes so intense that time itself slows down. From an outside observer's perspective, anything falling in appears to freeze at the edge—never quite crossing it.",
      realWorld: "This isn't just theory. GPS satellites must account for time dilation from both Earth's gravity and their orbital speed. Without Einstein's corrections, your GPS would be off by kilometers each day.",
      assessmentPrompt: "Explain to a friend why GPS satellites prove Einstein was right about time dilation. Use simple language.",
      connections: [2, 3]
    },
    2: {
      title: "How do trees secretly communicate?",
      domain: "biology",
      hook: "Forests are superorganisms, not collections of individuals",
      coreInsight: "Trees connect underground through vast mycorrhizal networks—fungal threads linking root systems across entire forests. Through these networks, trees share nutrients, send warning signals about pests, and even nourish their young.",
      realWorld: "Mother trees recognize their offspring and preferentially send them nutrients. When attacked by insects, trees send chemical warnings through the fungal network, allowing neighbors to prepare defenses in advance.",
      assessmentPrompt: "Explain how the 'wood wide web' works and why it matters to someone who thinks trees are just individual plants.",
      connections: [1, 3, 5]
    },
    3: {
      title: "Why do we find certain things beautiful?",
      domain: "psychology",
      hook: "Beauty might be your brain recognizing efficient patterns",
      coreInsight: "Neuroscience suggests beauty is linked to pattern recognition and processing efficiency. The golden ratio, symmetry, and fractals appear across nature and art because our brains evolved to quickly process these efficient information structures.",
      realWorld: "This explains why diverse cultures often agree on aesthetic principles despite vastly different contexts. The neural 'reward' we feel from beauty might be our brain saying 'this pattern is valuable and worth remembering.'",
      assessmentPrompt: "Explain why cultures across the world tend to agree on what's beautiful, even though they developed independently.",
      connections: [1, 2, 4]
    },
    4: {
      title: "How does your brain predict the future?",
      domain: "neuroscience",
      hook: "Your brain is a prediction machine, not a perception machine",
      coreInsight: "Your brain constantly generates predictions about what will happen next, then compares reality to expectations. What you perceive isn't raw sensory input—it's your brain's best guess, updated by prediction errors.",
      realWorld: "This explains optical illusions, déjà vu, and why time seems to slow during accidents. Your brain's prediction system temporarily breaks down, forcing conscious processing of every detail.",
      assessmentPrompt: "Explain why you sometimes 'see' things that aren't there, using the prediction machine model.",
      connections: [3, 5, 8]
    },
    5: {
      title: "What if bacteria run the world?",
      domain: "microbiology",
      hook: "Your body contains more bacterial cells than human cells",
      coreInsight: "The human microbiome contains 39 trillion bacterial cells compared to 30 trillion human cells. These bacteria influence everything from digestion to mood, immune function to behavior. You're not an individual—you're an ecosystem.",
      realWorld: "Fecal transplants can cure diseases by transferring healthy gut bacteria. Scientists are discovering that depression, anxiety, and even autism may be partially influenced by gut microbiome composition.",
      assessmentPrompt: "Explain how bacteria in your gut might influence your mental health to someone skeptical about the gut-brain connection.",
      connections: [2, 4, 6]
    },
    6: {
      title: "Why does quantum physics break reality?",
      domain: "physics",
      hook: "Particles exist in multiple states until observed",
      coreInsight: "In quantum mechanics, particles don't have definite properties until measured. An electron can be in multiple places simultaneously—a superposition of states. Only when you observe it does reality 'collapse' into one outcome.",
      realWorld: "This isn't philosophy—it's technology. Quantum computers exploit superposition to process information in ways classical computers can't. Your smartphone's transistors are so small they rely on quantum tunneling to function.",
      assessmentPrompt: "Explain how quantum superposition enables quantum computers to solve certain problems faster than regular computers.",
      connections: [1, 7, 11]
    },
    7: {
      title: "Can octopuses think without a brain?",
      domain: "biology",
      hook: "Two-thirds of an octopus's neurons are in its arms, not its brain",
      coreInsight: "Each octopus arm operates semi-independently with its own neural cluster—essentially functioning as a separate brain. Arms can solve problems, navigate mazes, and manipulate objects while the central brain focuses on higher-level decisions.",
      realWorld: "This distributed intelligence challenges our notion of consciousness. When an octopus arm is severed, it continues responding to stimuli for hours. We're learning about alien intelligence on Earth—cognition without centralization.",
      assessmentPrompt: "Explain why octopus intelligence challenges our assumptions about how minds must be structured.",
      connections: [2, 5, 9]
    },
    8: {
      title: "What if you never forget anything?",
      domain: "neuroscience",
      hook: "Forgetting is a feature, not a bug",
      coreInsight: "Your brain actively prunes memories through a process called synaptic homeostasis. During sleep, weak neural connections are eliminated while important ones strengthen. Without forgetting, your brain would be paralyzed by irrelevant information.",
      realWorld: "People with hyperthymesia remember every day of their lives in detail—and find it debilitating. They struggle with decision-making because trivial memories compete with important ones. Strategic forgetting enables adaptive behavior.",
      assessmentPrompt: "Explain why perfect memory would actually make you less intelligent, not more.",
      connections: [4, 10, 14]
    },
    9: {
      title: "Why do we sleep?",
      domain: "biology",
      hook: "Sleep clears toxic waste from your brain",
      coreInsight: "During sleep, your brain's glymphatic system flushes out metabolic waste products that accumulate during waking hours. Cerebrospinal fluid flows through brain tissue, clearing proteins like beta-amyloid that contribute to Alzheimer's.",
      realWorld: "Chronic sleep deprivation doesn't just make you tired—it physically damages your brain. The waste clearance system only activates during deep sleep. One night of total sleep deprivation increases Alzheimer's biomarkers in spinal fluid.",
      assessmentPrompt: "Explain the glymphatic system and why pulling all-nighters has long-term consequences beyond just feeling tired.",
      connections: [7, 8, 5]
    },
    10: {
      title: "How does language shape thought?",
      domain: "psychology",
      hook: "Languages without future tense save more money",
      coreInsight: "The Sapir-Whorf hypothesis suggests language structures cognition. Languages that grammatically separate present and future (English: 'it rains' vs 'it will rain') make speakers perceive future events as more psychologically distant.",
      realWorld: "Speakers of 'futureless' languages (German, Mandarin) exhibit 30% higher savings rates and better long-term health behaviors. When your language treats tomorrow like today, you make more prudent decisions. Language literally rewires economic behavior.",
      assessmentPrompt: "Explain how the grammatical structure of your native language might influence your financial decisions.",
      connections: [3, 8, 13]
    },
    11: {
      title: "What if reality is a hologram?",
      domain: "physics",
      hook: "The universe might be a 2D projection on a cosmic horizon",
      coreInsight: "The holographic principle suggests all information in a 3D space can be encoded on its 2D boundary—like a hologram. Black hole thermodynamics revealed information is proportional to surface area, not volume, implying reality's true nature is two-dimensional.",
      realWorld: "This solves the black hole information paradox and unifies quantum mechanics with gravity. Physicists are building 'holographic dualities' where complex 3D systems are exactly equivalent to simpler 2D theories. Your perception of depth might be emergent, not fundamental.",
      assessmentPrompt: "Explain why physicists think a 2D universe could appear 3D to observers inside it.",
      connections: [6, 1, 15]
    },
    12: {
      title: "Why are cities like organisms?",
      domain: "complex systems",
      hook: "Cities scale with mathematical precision",
      coreInsight: "As cities double in population, infrastructure needs (roads, gas stations) grow by 85%, but innovation outputs (patents, GDP, wages) grow by 115%. Cities exhibit superlinear scaling—they become more productive per capita as they grow, just like metabolism in organisms.",
      realWorld: "This explains why New York generates more innovation per person than Toledo. Dense networks enable more random collisions between ideas. Urban planners use these power laws to predict resource needs and economic potential decades in advance.",
      assessmentPrompt: "Explain why doubling a city's population more than doubles its economic output.",
      connections: [2, 13, 7]
    },
    13: {
      title: "Can markets predict the future?",
      domain: "economics",
      hook: "Prediction markets outperform expert forecasters",
      coreInsight: "When people bet real money on outcomes, market prices aggregate distributed information more accurately than any individual expert. The 'wisdom of crowds' emerges not from averaging opinions, but from weighted voting—people confident in their knowledge bet more.",
      realWorld: "Prediction markets correctly called Brexit, the 2016 US election, and pandemic timelines when polls and experts failed. Companies use internal prediction markets for product launches. Trader incentives align with truth-seeking, not narrative-building.",
      assessmentPrompt: "Explain why betting markets often know more than expert panels, using information aggregation principles.",
      connections: [10, 12, 6]
    },
    14: {
      title: "What if consciousness is a conductor?",
      domain: "neuroscience",
      hook: "Your brain processes information unconsciously, consciousness just orchestrates",
      coreInsight: "Global Workspace Theory suggests consciousness is like a spotlight—it doesn't create thoughts, it broadcasts select information to specialized brain regions. Most processing happens unconsciously; awareness just coordinates which modules need to communicate.",
      realWorld: "This explains why you can drive home on autopilot or why solutions appear after 'sleeping on it.' Unconscious processing solves problems; consciousness decides which solutions deserve attention. Meditation trains this selection mechanism.",
      assessmentPrompt: "Explain why most of your intelligence operates outside your awareness, using the global workspace model.",
      connections: [8, 4, 9]
    },
    15: {
      title: "Why does democracy survive?",
      domain: "political science",
      hook: "Democratic stability requires credible commitment mechanisms",
      coreInsight: "Democracy persists not because people value fairness, but because institutions make power transfers predictable. Winners can't completely eliminate losers (checks and balances), and losers accept results because they'll get another chance. It's repeated game theory.",
      realWorld: "Countries with strong institutions weather transitions peacefully; weak institutions trigger coups when losing parties face existential risk. The US Constitution's genius isn't ideology—it's mutual insurance. Each faction protects the system because they might need it tomorrow.",
      assessmentPrompt: "Explain why democracies with strong institutions rarely collapse, using game theory concepts.",
      connections: [13, 10, 12]
    }
  };

  const handleAuthentication = async (e) => {
    e.preventDefault();
    if (userEmail.includes('@')) {
      try {
        await window.storage.set('user_authenticated', 'true');
        await window.storage.set('user_email', userEmail);
        
        // Generate referral code
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        await window.storage.set('referral_code', code);
        setReferralCode(code);
        
        setIsAuthenticated(true);
        setActiveView('wonder');
      } catch (error) {
        console.error('Storage error:', error);
        setIsAuthenticated(true);
        setActiveView('wonder');
      }
    }
  };

  const scheduleReview = async (wonderId) => {
    const now = Date.now();
    const schedule = {
      [wonderId]: {
        day1: now + 86400000, // 1 day
        day3: now + 259200000, // 3 days
        day7: now + 604800000, // 7 days
        day14: now + 1209600000 // 14 days
      }
    };
    
    const updatedSchedule = { ...reviewSchedule, ...schedule };
    setReviewSchedule(updatedSchedule);
    
    try {
      await window.storage.set('review_schedule', JSON.stringify(updatedSchedule));
    } catch (error) {
      console.error('Failed to save schedule:', error);
    }
  };

  const calculateArticulationScore = (text) => {
    const wordCount = text.trim().split(/\s+/).length;
    const sentenceCount = (text.match(/[.!?]+/g) || []).length;
    const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
    
    // Scoring: word count (40%), sentence structure (30%), time taken (30%)
    const wordScore = Math.min((wordCount / 100) * 40, 40);
    const structureScore = (avgSentenceLength > 8 && avgSentenceLength < 25) ? 30 : 15;
    const timeScore = startTime ? Math.min(((Date.now() - startTime) / 60000) * 10, 30) : 0;
    
    return Math.round(wordScore + structureScore + timeScore);
  };

  const handleResponseSubmit = async () => {
    if (userResponse.trim().length < 50) {
      alert('Please provide a more detailed explanation (at least 50 characters)');
      return;
    }
    
    const score = calculateArticulationScore(userResponse);
    setArticulationScore(score);
    
    try {
      const existingScores = await window.storage.get('articulation_scores');
      const scores = existingScores?.value ? JSON.parse(existingScores.value) : [];
      scores.push(score);
      await window.storage.set('articulation_scores', JSON.stringify(scores));
      
      // Save response
      await window.storage.set(`response_${currentDay}_${Date.now()}`, JSON.stringify({
        wonderId: currentDay,
        response: userResponse,
        score: score,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Failed to save assessment:', error);
    }
    
    setAssessmentMode(false);
    setUserResponse('');
  };

  useEffect(() => {
    if (isPlaying && wonderProgress < 100) {
      const timer = setInterval(() => {
        setWonderProgress(prev => Math.min(prev + 0.8, 100));
      }, 100);
      return () => clearInterval(timer);
    }
    if (wonderProgress >= 100 && !completedWonders.includes(currentDay)) {
      const updated = [...completedWonders, currentDay];
      setCompletedWonders(updated);
      scheduleReview(currentDay);
      
      try {
        window.storage.set('completed_wonders', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save completion:', error);
      }
    }
  }, [isPlaying, wonderProgress, currentDay, completedWonders]);

  useEffect(() => {
    const timer = setTimeout(() => setShowNav(false), 3000);
    return () => clearTimeout(timer);
  }, [activeView]);

  const AuthView = () => (
    <div className="relative h-full bg-gradient-to-br from-purple-950 via-slate-950 to-black flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Sparkles className="mx-auto text-purple-400 mb-4" size={48} />
          <h1 className="text-3xl font-light text-white mb-2">Knowledge Companion</h1>
          <p className="text-white/60 font-light">Transform insights into conversation</p>
        </div>
        
        <form onSubmit={handleAuthentication} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="mb-6">
            <label className="block text-white/80 text-sm font-light mb-2">Email Address</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:border-purple-500/50 focus:outline-none font-light"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-6 py-3 bg-purple-500/30 hover:bg-purple-500/40 rounded-lg text-white font-light transition-all"
          >
            Begin Journey
          </button>
          
          <p className="text-white/40 text-xs text-center mt-6 font-light">
            Join 50 beta users validating the future of learning
          </p>
        </form>
      </div>
    </div>
  );

  const DailyWonder = () => {
    const wonder = wondersData[currentDay];
    
    if (!wonder) {
      return (
        <div className="relative h-full bg-black overflow-hidden flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="mx-auto text-white/20 mb-4" size={64} />
            <h2 className="text-2xl font-light text-white mb-2">More Wonders Coming</h2>
            <p className="text-white/50 font-light">New content unlocks weekly</p>
            <button 
              onClick={() => setCurrentDay(1)}
              className="mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-light transition-colors"
            >
              Review Day 1
            </button>
          </div>
        </div>
      );
    }
    
    const stage = wonderProgress < 25 ? 'hook' : wonderProgress < 55 ? 'core' : wonderProgress < 80 ? 'real' : 'complete';
    const isCompleted = completedWonders.includes(currentDay);

    if (assessmentMode) {
      return (
        <div className="relative h-full bg-gradient-to-b from-slate-950 to-black overflow-y-auto flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            <h2 className="text-2xl font-light text-white text-center mb-8">Articulation Assessment</h2>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-6">
              <h3 className="text-xl font-light text-white mb-4">{wonder.title}</h3>
              <p className="text-white/70 font-light mb-6">{wonder.assessmentPrompt}</p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setIsRecording(!isRecording);
                      if (!isRecording) setStartTime(Date.now());
                    }}
                    className={`flex-1 px-6 py-4 ${isRecording ? 'bg-red-500/30' : 'bg-purple-500/30'} hover:bg-purple-500/40 rounded-xl text-white font-light transition-all flex items-center justify-center gap-2`}
                  >
                    <Mic size={20} />
                    {isRecording ? 'Recording...' : 'Voice Response'}
                  </button>
                  <button
                    onClick={() => {
                      if (!startTime) setStartTime(Date.now());
                    }}
                    className="flex-1 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-light transition-all"
                  >
                    Text Response
                  </button>
                </div>
                
                <textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  onFocus={() => { if (!startTime) setStartTime(Date.now()); }}
                  className="w-full h-48 bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-white/30 focus:border-purple-500/50 focus:outline-none resize-none font-light"
                  placeholder="Type your explanation here..."
                />
                
                <div className="flex items-center justify-between text-sm text-white/50">
                  <span>{userResponse.length} characters · {userResponse.trim().split(/\s+/).length} words</span>
                  {startTime && <span>Time: {Math.round((Date.now() - startTime) / 1000)}s</span>}
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setAssessmentMode(false);
                      setUserResponse('');
                      setStartTime(null);
                    }}
                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-light transition-all"
                  >
                    Skip for Now
                  </button>
                  <button
                    onClick={handleResponseSubmit}
                    className="flex-1 px-6 py-3 bg-purple-500/30 hover:bg-purple-500/40 rounded-xl text-white font-light transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Submit
                  </button>
                </div>
              </div>
            </div>
            
            {articulationScore !== null && (
              <div className="bg-emerald-500/10 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-300 font-light">Articulation Score</span>
                  <span className="text-3xl font-light text-white">{articulationScore}/100</span>
                </div>
                <p className="text-white/70 text-sm font-light">
                  {articulationScore > 70 ? 'Excellent clarity and depth!' : articulationScore > 50 ? 'Good foundation, add more details' : 'Try explaining with specific examples'}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-full bg-black overflow-hidden" 
           onMouseMove={() => setShowNav(true)}>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          {currentDay === 1 && (
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-80 blur-md" style={{ animation: 'spin 20s linear infinite' }} />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-900 via-black to-black" />
              <div className="absolute inset-16 rounded-full bg-black shadow-2xl" />
            </div>
          )}
          {currentDay === 2 && (
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full shadow-lg shadow-green-500/50" />
              </div>
            </div>
          )}
          {currentDay >= 3 && (
            <div className="relative w-80 h-80">
              <Sparkles className="text-purple-400 w-32 h-32" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            </div>
          )}
        </div>

        <div className="absolute inset-0 flex flex-col justify-end pb-32 px-8 pointer-events-none">
          <div className="max-w-3xl mx-auto w-full space-y-8">
            
            <h1 className="text-3xl md:text-4xl font-light text-white text-center leading-tight">
              {wonder.title}
            </h1>

            {stage === 'hook' && (
              <div style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
                <p className="text-xl text-white/70 text-center italic font-light">
                  {wonder.hook}
                </p>
              </div>
            )}

            {stage === 'core' && (
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 pointer-events-auto" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
                <p className="text-white/90 text-lg leading-relaxed font-light">
                  {wonder.coreInsight}
                </p>
              </div>
            )}

            {stage === 'real' && (
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border-l-4 border-yellow-400/80 pointer-events-auto" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
                <p className="text-white/90 text-lg leading-relaxed font-light">
                  {wonder.realWorld}
                </p>
              </div>
            )}

            {stage === 'complete' && (
              <div className="space-y-4 pointer-events-auto" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
                <div className="bg-purple-500/10 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="text-purple-400" size={20} />
                    <span className="text-purple-300 font-light">Wonder Complete</span>
                  </div>
                  <p className="text-white/80 text-sm font-light">
                    Now test your understanding by explaining this concept to someone else.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveView('dashboard')}
                    className="flex-1 px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white font-light transition-all"
                  >
                    View Dashboard
                  </button>
                  <button 
                    onClick={() => {
                      setAssessmentMode(true);
                      setStartTime(null);
                    }}
                    className="flex-1 px-6 py-4 bg-purple-500/30 hover:bg-purple-500/40 backdrop-blur-md rounded-xl text-white font-light transition-all flex items-center justify-center gap-2"
                  >
                    Take Assessment
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                {currentDay < Object.keys(wondersData).length && (
                  <button 
                    onClick={() => {
                      setCurrentDay(currentDay + 1);
                      setWonderProgress(0);
                      setIsPlaying(false);
                    }}
                    className="w-full px-6 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl text-white/70 font-light transition-all"
                  >
                    Continue to Next Wonder
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {stage !== 'complete' && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 pointer-events-auto flex gap-4 items-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white font-light transition-all flex items-center gap-3 shadow-lg"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? 'Playing' : 'Begin'}
            </button>
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all shadow-lg"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        )}

        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-64">
          <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-300"
              style={{ width: `${wonderProgress}%` }}
            />
          </div>
        </div>

        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          <span className="text-white/30 text-sm font-light">Wonder {currentDay} of {Object.keys(wondersData).length}</span>
          {isCompleted && <Check className="text-emerald-400" size={16} />}
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    const totalWonders = Object.keys(wondersData).length;
    const completionRate = Math.round((completedWonders.length / totalWonders) * 100);
    const upcomingReviews = Object.entries(reviewSchedule).filter(([_, times]) => {
      return Object.values(times).some(time => time > Date.now());
    }).length;

    return (
      <div className="relative h-full bg-gradient-to-b from-slate-950 to-black overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto pt-8 pb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-2">Learning Dashboard</h2>
            <p className="text-white/50 text-sm font-light">{userEmail}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-purple-400" size={24} />
                <span className="text-white/60 text-sm font-light">Completion Rate</span>
              </div>
              <div className="text-4xl font-light text-white mb-2">{completionRate}%</div>
              <div className="text-white/50 text-sm font-light">{completedWonders.length} of {totalWonders} wonders</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-emerald-400" size={24} />
                <span className="text-white/60 text-sm font-light">Articulation Score</span>
              </div>
              <div className="text-4xl font-light text-white mb-2">
                {articulationScore !== null ? articulationScore : '--'}
              </div>
              <div className="text-white/50 text-sm font-light">Last assessment</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-blue-400" size={24} />
                <span className="text-white/60 text-sm font-light">Upcoming Reviews</span>
              </div>
              <div className="text-4xl font-light text-white mb-2">{upcomingReviews}</div>
              <div className="text-white/50 text-sm font-light">Scheduled reminders</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-8">
            <h3 className="text-xl font-light text-white mb-6">Your Wonder Journey</h3>
            <div className="space-y-4">
              {Object.entries(wondersData).map(([id, wonder]) => {
                const isCompleted = completedWonders.includes(parseInt(id));
                return (
                  <div
                    key={id}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      isCompleted ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {isCompleted ? (
                        <Check className="text-emerald-400" size={20} />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                      )}
                      <div>
                        <h4 className="text-white font-light">{wonder.title}</h4>
                        <span className="text-white/50 text-sm font-light">{wonder.domain}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentDay(parseInt(id));
                        setWonderProgress(0);
                        setIsPlaying(false);
                        setActiveView('wonder');
                      }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-light transition-all"
                    >
                      {isCompleted ? 'Review' : 'Start'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30">
            <div className="flex items-start gap-4">
              <Users className="text-purple-400 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="text-xl font-light text-white mb-2">Invite Friends</h3>
                <p className="text-white/70 text-sm font-light mb-4">
                  Share your referral code and help validate the future of learning
                </p>
                {referralCode && (
                  <div className="flex gap-3">
                    <div className="flex-1 px-4 py-3 bg-white/10 rounded-lg">
                      <span className="text-white font-mono text-lg">{referralCode}</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(referralCode);
                        setShowReferral(true);
                        setTimeout(() => setShowReferral(false), 2000);
                      }}
                      className="px-6 py-3 bg-purple-500/30 hover:bg-purple-500/40 rounded-lg text-white font-light transition-all"
                    >
                      {showReferral ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const navigationItems = [
    { id: 'wonder', icon: Sparkles, label: 'Wonder' },
    { id: 'dashboard', icon: Brain, label: 'Dashboard' }
  ];

  if (!isAuthenticated) {
    return <AuthView />;
  }

  return (
    <div className="h-screen flex flex-col bg-black">
      <div className="flex-1 overflow-hidden">
        {activeView === 'wonder' && <DailyWonder />}
        {activeView === 'dashboard' && <Dashboard />}
      </div>

      <nav className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
        showNav ? 'opacity-100' : 'opacity-0'
      } z-50`}>
        <div className="flex gap-3 bg-white/5 backdrop-blur-md rounded-full p-2 border border-white/10">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/70'
                }`}
                title={item.label}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default KnowledgeCompanion;
