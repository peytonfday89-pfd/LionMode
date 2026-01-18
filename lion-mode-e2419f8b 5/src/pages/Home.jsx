import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Share2, Clock, Flame, ChevronDown, Check, Settings, Plus, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ThemeSelector, { THEMES, BACKGROUNDS } from '../components/ThemeSelector';
import DailyGoal from '../components/DailyGoal';
import QuoteSubmission from '../components/QuoteSubmission';
import VoiceSettings from '../components/VoiceSettings';
import AIQuoteGenerator from '../components/AIQuoteGenerator';

const QUOTES = [
  { text: "LIONS DON'T LOSE SLEEP OVER THE OPINIONS OF SHEEP.", subtext: "Be the predator, not the prey." },
  { text: "WHILE YOU'RE SLEEPING, SOMEONE IS GRINDING.", subtext: "Every second counts." },
  { text: "PAIN IS TEMPORARY. QUITTING LASTS FOREVER.", subtext: "Push through or regret it." },
  { text: "STOP WISHING. START DOING.", subtext: "Action beats intention every time." },
  { text: "YOUR COMFORT ZONE IS YOUR COFFIN.", subtext: "Growth lives in discomfort." },
  { text: "EXCUSES ARE FOR THE WEAK.", subtext: "Results speak louder than reasons." },
  { text: "BE A FUCKING LION IN A WORLD OF SHEEP.", subtext: "Dominate or be dominated." },
  { text: "THE TIME ISN'T TOMORROW. THE TIME IS NOW.", subtext: "Tomorrow is a lie you tell yourself." },
  { text: "GET OFF YOUR ASS AND MAKE IT HAPPEN.", subtext: "Nobody's coming to save you." },
  { text: "QUIT BEING A PUSSY. START BEING A BEAST.", subtext: "Soft gets you nowhere." },
  { text: "DISCIPLINE BEATS MOTIVATION EVERY DAMN DAY.", subtext: "Feelings are irrelevant." },
  { text: "WEAK PEOPLE REVENGE. STRONG PEOPLE FORGIVE. INTELLIGENT PEOPLE IGNORE.", subtext: "Rise above the noise." },
  { text: "YOU'RE NOT TIRED. YOU'RE UNINSPIRED.", subtext: "Find your fire or burn out." },
  { text: "AVERAGE IS A CHOICE. EXCELLENCE IS A DECISION.", subtext: "Choose wisely." },
  { text: "DESTROY WHAT DESTROYS YOU.", subtext: "Eliminate weakness ruthlessly." },
  { text: "OBSESSED IS A WORD THE LAZY USE FOR THE DEDICATED.", subtext: "Let them talk while you work." },
  { text: "YOUR ONLY LIMIT IS YOUR MIND.", subtext: "Break the chains you built." },
  { text: "SUFFER THE PAIN OF DISCIPLINE OR SUFFER THE PAIN OF REGRET.", subtext: "Pick your poison." },
  { text: "NOBODY CARES. WORK HARDER.", subtext: "The world owes you nothing." },
  { text: "DON'T PRAY FOR EASY LIVES. PRAY TO BE STRONGER.", subtext: "Challenges forge champions." },
  { text: "WAKE UP. KICK ASS. REPEAT.", subtext: "Simplicity wins." },
  { text: "HUNGRY DOGS RUN FASTER.", subtext: "Stay starving for more." },
  { text: "THE WOLF ON THE HILL IS NEVER AS HUNGRY AS THE WOLF CLIMBING IT.", subtext: "Never stop climbing." },
  { text: "THEY LAUGH AT ME BECAUSE I'M DIFFERENT. I LAUGH AT THEM BECAUSE THEY'RE ALL THE SAME.", subtext: "Stand out or fade away." },
  { text: "IF IT DOESN'T CHALLENGE YOU, IT WON'T CHANGE YOU.", subtext: "Seek the hard path." },
  { text: "GREATNESS IS NOT GIVEN. IT'S EARNED.", subtext: "Pay the price or stay average." },
  { text: "BE SCARED AND DO IT ANYWAY.", subtext: "Fear is not an excuse." },
  { text: "YOU DON'T NEED PERMISSION TO BE GREAT.", subtext: "Crown yourself." },
  { text: "WINNERS FOCUS ON WINNING. LOSERS FOCUS ON WINNERS.", subtext: "Stay in your lane." },
  { text: "THE ONLY BAD WORKOUT IS THE ONE YOU DIDN'T DO.", subtext: "Show up or shut up." },
  { text: "FALL IN LOVE WITH THE PROCESS.", subtext: "Results are just a bonus." },
  { text: "YOUR COMPETITION IS WORKING RIGHT NOW.", subtext: "What are you doing?" },
  { text: "LEGENDS ARE MADE IN THE DARK.", subtext: "Nobody's watching your grind." },
  { text: "PROVE THEM WRONG. EVERY. SINGLE. DAY.", subtext: "Let success be the revenge." },
  { text: "YOU CAN'T HURT STEEL.", subtext: "Be unbreakable." },
  { text: "BE SO GOOD THEY CAN'T IGNORE YOU.", subtext: "Skill speaks volumes." },
  { text: "REST WHEN YOU'RE DEAD.", subtext: "Sleep is for the finished." },
  { text: "OUTWORK YOUR POTENTIAL.", subtext: "Talent isn't enough." },
  { text: "THE GRIND NEVER STOPS.", subtext: "Neither should you." },
  { text: "MAKE YOURSELF PROUD.", subtext: "You're the only one who matters." },
  { text: "CHAMPIONS TRAIN. LOSERS COMPLAIN.", subtext: "Pick a side." },
  { text: "DO IT FOR THE PERSON YOU'LL BE IN 5 YEARS.", subtext: "Future you is watching." },
  { text: "PRESSURE MAKES DIAMONDS.", subtext: "Embrace the weight." },
  { text: "BEAST MODE ISN'T A SWITCH. IT'S A LIFESTYLE.", subtext: "Live it daily." },
  { text: "THE PAIN YOU FEEL TODAY IS THE STRENGTH YOU FEEL TOMORROW.", subtext: "Invest in suffering." },
  { text: "TALK LESS. DO MORE.", subtext: "Actions > Words." },
  { text: "YOU'RE EITHER GROWING OR DYING.", subtext: "There's no neutral." },
  { text: "EAT. SLEEP. CONQUER. REPEAT.", subtext: "Simple formula." },
  { text: "MAKE IT HAPPEN. SHOCK EVERYONE.", subtext: "Prove them all wrong." },
  { text: "BE OBSESSED OR BE AVERAGE.", subtext: "Choose your reality." },
  { text: "YOUR EXCUSES ARE JUST LIES YOU TELL YOURSELF.", subtext: "Stop the bullshit." },
  { text: "COMFORT KILLS DREAMS.", subtext: "Stay hungry. Stay uncomfortable." },
  { text: "THE HARDER YOU WORK, THE LUCKIER YOU GET.", subtext: "Luck is manufactured." },
  { text: "STOP COUNTING DAYS. MAKE DAYS COUNT.", subtext: "Time is currency." },
  { text: "IF YOU WANT IT, GO GET IT. PERIOD.", subtext: "No more waiting." },
  { text: "BLEED FOR IT OR FORGET IT.", subtext: "Sacrifice determines success." },
  { text: "BE A SAVAGE. NOT AVERAGE.", subtext: "Mediocrity is a disease." },
  { text: "DOUBT KILLS MORE DREAMS THAN FAILURE EVER WILL.", subtext: "Bet on yourself." },
  { text: "RISE AND FUCKING GRIND.", subtext: "Morning decides the day." },
  { text: "YOUR HATERS ARE YOUR BIGGEST MOTIVATORS.", subtext: "Thank them with success." },
  { text: "KILL COMFORT. EMBRACE CHAOS.", subtext: "Order comes from disorder." },
  { text: "WORK UNTIL YOUR IDOLS BECOME YOUR RIVALS.", subtext: "Aim higher than heroes." },
  { text: "BE THE ENERGY YOU WANT TO ATTRACT.", subtext: "Radiate power." },
  { text: "LOSING IS NOT AN OPTION.", subtext: "Win or learn." },
  { text: "PUSH YOURSELF BECAUSE NO ONE ELSE WILL.", subtext: "Self-reliance is key." },
  { text: "MAKE THEM REMEMBER YOUR NAME.", subtext: "Legacy over comfort." },
  { text: "YOU'RE ONE WORKOUT AWAY FROM A GOOD MOOD.", subtext: "Move your ass." },
  { text: "SWEAT IS FAT CRYING.", subtext: "Make it weep." },
  { text: "IMPOSSIBLE IS JUST AN OPINION.", subtext: "Rewrite the rules." },
  { text: "TRAIN INSANE OR REMAIN THE SAME.", subtext: "Normal is overrated." },
  { text: "LEAVE YOUR EGO AT THE DOOR.", subtext: "Humility builds empires." },
  { text: "RESULTS DON'T LIE. EFFORT DOES.", subtext: "Show real work." },
  { text: "BE RELENTLESS. BE UNSTOPPABLE.", subtext: "Break every barrier." },
  { text: "SUCCESS IS THE BEST REVENGE.", subtext: "Let them watch you win." },
  { text: "DON'T WAIT FOR OPPORTUNITY. CREATE IT.", subtext: "Be the architect." },
  { text: "YOUR MIND WILL QUIT A THOUSAND TIMES BEFORE YOUR BODY.", subtext: "Control your thoughts." },
  { text: "BE THE HARDEST WORKER IN THE ROOM.", subtext: "Always. Every room." },
  { text: "NO DAYS OFF.", subtext: "Rest is rust." },
  { text: "YOU GET WHAT YOU FUCKING DESERVE.", subtext: "Earn everything." },
  { text: "ELIMINATE THE WEAK SHIT.", subtext: "Cut the dead weight." },
  { text: "BE UNCOMFORTABLY AMBITIOUS.", subtext: "Scare yourself with goals." },
  { text: "CHAMPIONS DON'T COMPLAIN ABOUT THE GRIND.", subtext: "They embrace it." },
  { text: "MAKE EVERY REP COUNT.", subtext: "Quality over quantity." },
  { text: "YOU'RE BUILT DIFFERENT. ACT LIKE IT.", subtext: "Own your edge." },
  { text: "TURN PAIN INTO POWER.", subtext: "Alchemy of suffering." },
  { text: "THE FIRE INSIDE BURNS BRIGHTER THAN THE FIRE AROUND YOU.", subtext: "Let it rage." },
  { text: "STAY DANGEROUS.", subtext: "Unpredictable wins." },
  { text: "MASTER YOUR MIND. MASTER YOUR LIFE.", subtext: "Control the controller." },
  { text: "BE A WARRIOR, NOT A WORRIER.", subtext: "Action kills anxiety." },
  { text: "NO SURRENDER. NO RETREAT.", subtext: "Forward is the only way." },
  { text: "MOMENTUM IS EVERYTHING.", subtext: "Keep moving forward." },
  { text: "SACRIFICE NOW. CELEBRATE LATER.", subtext: "Delayed gratification wins." },
  { text: "YOUR LEGACY IS BEING WRITTEN NOW.", subtext: "Make it legendary." },
  { text: "WEAK MOMENTS CREATE WEAK LIVES.", subtext: "Stay strong always." },
  { text: "THE BEST VIEW COMES AFTER THE HARDEST CLIMB.", subtext: "Embrace the struggle." },
  { text: "COMFORT IS THE ENEMY OF ACHIEVEMENT.", subtext: "Get uncomfortable daily." },
  { text: "DOMINATE OR BE DOMINATED.", subtext: "There's no middle ground." },
  { text: "YOUR STRUGGLE IS YOUR STRENGTH.", subtext: "Wear it like armor." },
  { text: "FEARLESS IS NOT THE ABSENCE OF FEAR. IT'S ACTION IN SPITE OF IT.", subtext: "Feel fear. Do it anyway." },
  { text: "STOP BEING A VICTIM. START BEING A VICTOR.", subtext: "Change the narrative." },
  { text: "EVERY CHAMPION WAS ONCE A CONTENDER WHO REFUSED TO GIVE UP.", subtext: "Persistence is key." },
  { text: "THE HARDER THE BATTLE, THE SWEETER THE VICTORY.", subtext: "Earn your wins." },
  { text: "PUSH PAST YOUR LIMITS. THAT'S WHERE MAGIC HAPPENS.", subtext: "Break your ceiling." },
  { text: "YOU DON'T RISE TO THE LEVEL OF YOUR GOALS. YOU FALL TO THE LEVEL OF YOUR SYSTEMS.", subtext: "Build better habits." },
  { text: "STOP WAITING FOR FRIDAY. STOP WAITING FOR SUMMER. STOP WAITING FOR LIFE.", subtext: "Live now." },
  { text: "THE DIFFERENCE BETWEEN WHO YOU ARE AND WHO YOU WANT TO BE IS WHAT YOU DO.", subtext: "Action defines you." },
  { text: "ORDINARY IS A CHOICE.", subtext: "Choose extraordinary." },
  { text: "BURN THE BOATS.", subtext: "No retreat. Only victory." },
  { text: "GET ADDICTED TO IMPROVEMENT.", subtext: "Progress is the drug." },
  { text: "YOUR CURRENT SITUATION IS NOT YOUR FINAL DESTINATION.", subtext: "Keep climbing." },
  { text: "ADAPT. IMPROVISE. OVERCOME.", subtext: "Be unstoppable." },
  { text: "THE ONLY PERSON YOU SHOULD TRY TO BE BETTER THAN IS THE PERSON YOU WERE YESTERDAY.", subtext: "Compete with yourself." },
  { text: "MAKE YOUR PASSION YOUR PAYCHECK.", subtext: "Love what you do." },
  { text: "DON'T STOP WHEN YOU'RE TIRED. STOP WHEN YOU'RE DONE.", subtext: "Finish what you start." },
  { text: "GREAT THINGS NEVER COME FROM COMFORT ZONES.", subtext: "Get out there." },
  { text: "THE SECRET TO GETTING AHEAD IS GETTING STARTED.", subtext: "Begin now." },
  { text: "HUSTLE IN SILENCE. LET SUCCESS MAKE THE NOISE.", subtext: "Work speaks louder." },
  { text: "BE STRONGER THAN YOUR EXCUSES.", subtext: "Excuses are weakness." },
  { text: "FOCUS ON BEING PRODUCTIVE INSTEAD OF BUSY.", subtext: "Results matter most." },
  { text: "SMALL PROGRESS IS STILL PROGRESS.", subtext: "Keep moving forward." },
  { text: "DON'T WATCH THE CLOCK. DO WHAT IT DOES. KEEP GOING.", subtext: "Time waits for no one." },
  { text: "THE ONLY WAY TO DO GREAT WORK IS TO LOVE WHAT YOU DO.", subtext: "Passion fuels greatness." },
  { text: "STRIVE FOR PROGRESS, NOT PERFECTION.", subtext: "Done beats perfect." },
  { text: "YOU ARE CONFINED ONLY BY THE WALLS YOU BUILD YOURSELF.", subtext: "Break free." },
  { text: "EVERYTHING YOU WANT IS ON THE OTHER SIDE OF FEAR.", subtext: "Face it head-on." },
  { text: "WINNERS NEVER QUIT. QUITTERS NEVER WIN.", subtext: "Choose your side." },
  { text: "IT'S NOT ABOUT HAVING TIME. IT'S ABOUT MAKING TIME.", subtext: "Priorities matter." },
  { text: "DO SOMETHING TODAY THAT YOUR FUTURE SELF WILL THANK YOU FOR.", subtext: "Invest in tomorrow." },
  { text: "THE BODY ACHIEVES WHAT THE MIND BELIEVES.", subtext: "Mental strength first." },
  { text: "GRIND NOW. SHINE LATER.", subtext: "Put in the work." },
  { text: "YOUR LIFE DOESN'T GET BETTER BY CHANCE. IT GETS BETTER BY CHANGE.", subtext: "Make the change." },
  { text: "EXCUSES WILL ALWAYS BE THERE. OPPORTUNITY WON'T.", subtext: "Seize the moment." },
  { text: "BE FEARLESS IN THE PURSUIT OF WHAT SETS YOUR SOUL ON FIRE.", subtext: "Chase your passion." },
  { text: "SUCCESS DOESN'T COME FROM WHAT YOU DO OCCASIONALLY. IT COMES FROM WHAT YOU DO CONSISTENTLY.", subtext: "Consistency wins." },
  { text: "THE DIFFERENCE BETWEEN ORDINARY AND EXTRAORDINARY IS THAT LITTLE EXTRA.", subtext: "Go the extra mile." },
  { text: "DON'T COUNT THE DAYS. MAKE THE DAYS COUNT.", subtext: "Quality over quantity." },
  { text: "YOUR VIBE ATTRACTS YOUR TRIBE.", subtext: "Energy is contagious." },
  { text: "STOP SAYING 'I WISH' AND START SAYING 'I WILL'.", subtext: "Words become actions." },
  { text: "THE ONLY LIMIT TO OUR REALIZATION OF TOMORROW IS OUR DOUBTS OF TODAY.", subtext: "Kill the doubt." },
  { text: "BELIEVE YOU CAN AND YOU'RE HALFWAY THERE.", subtext: "Faith moves mountains." },
  { text: "ACT AS IF WHAT YOU DO MAKES A DIFFERENCE. IT DOES.", subtext: "You matter." },
  { text: "DREAM BIG. WORK HARD. STAY FOCUSED.", subtext: "Triple threat formula." },
  { text: "THE BEST REVENGE IS MASSIVE SUCCESS.", subtext: "Outshine them all." },
  { text: "STOP DOUBTING YOURSELF. WORK HARD AND MAKE IT HAPPEN.", subtext: "Self-belief is everything." },
  { text: "WORK LIKE HELL. TELL EVERYONE YOUR GOALS.", subtext: "Accountability drives action." },
  { text: "STRONG PEOPLE DON'T PUT OTHERS DOWN. THEY LIFT THEM UP.", subtext: "Rise together." },
  { text: "IF YOU'RE GOING THROUGH HELL, KEEP GOING.", subtext: "Never stop moving." },
  { text: "THE ONLY TIME YOU SHOULD LOOK BACK IS TO SEE HOW FAR YOU'VE COME.", subtext: "Measure your progress." },
  { text: "YOU DIDN'T COME THIS FAR TO ONLY COME THIS FAR.", subtext: "Keep pushing forward." },
  { text: "FALL SEVEN TIMES. STAND UP EIGHT.", subtext: "Resilience defines you." },
  { text: "THE COMEBACK IS ALWAYS STRONGER THAN THE SETBACK.", subtext: "Bounce back harder." },
  { text: "MONSTERS DON'T SLEEP UNDER YOUR BED. THEY SLEEP INSIDE YOUR HEAD.", subtext: "Fight your demons." },
  { text: "YOUR ATTITUDE DETERMINES YOUR DIRECTION.", subtext: "Mindset matters most." },
  { text: "DO IT NOW. SOMETIMES 'LATER' BECOMES 'NEVER'.", subtext: "Act immediately." },
  { text: "THE EXPERT IN ANYTHING WAS ONCE A BEGINNER.", subtext: "Everyone starts somewhere." },
  { text: "YOU ARE YOUR ONLY LIMIT.", subtext: "Break your own barriers." },
  { text: "HUSTLE UNTIL YOU NO LONGER NEED TO INTRODUCE YOURSELF.", subtext: "Build your reputation." },
  { text: "WORK HARD IN SILENCE. LET SUCCESS BE YOUR NOISE.", subtext: "Results speak volumes." },
  { text: "DON'T BE BUSY. BE PRODUCTIVE.", subtext: "Output over activity." },
  { text: "EVERY ACCOMPLISHMENT STARTS WITH THE DECISION TO TRY.", subtext: "Just begin." },
  { text: "YOU DON'T NEED TO BE GREAT TO START, BUT YOU NEED TO START TO BE GREAT.", subtext: "Start now." },
  { text: "GOOD THINGS COME TO THOSE WHO HUSTLE.", subtext: "Effort pays off." },
  { text: "DON'T WISH FOR IT. WORK FOR IT.", subtext: "Action beats wishing." },
  { text: "BE STRONGER THAN YOUR STRONGEST EXCUSE.", subtext: "Demolish excuses." },
  { text: "YOUR NETWORK IS YOUR NET WORTH.", subtext: "Build relationships." },
  { text: "STARVE YOUR DISTRACTIONS. FEED YOUR FOCUS.", subtext: "Attention is currency." },
  { text: "BE A VOICE. NOT AN ECHO.", subtext: "Lead. Don't follow." },
  { text: "WORK UNTIL YOUR BANK ACCOUNT LOOKS LIKE A PHONE NUMBER.", subtext: "Build your empire." },
  { text: "THE HARDER YOU WORK FOR SOMETHING, THE GREATER YOU'LL FEEL WHEN YOU ACHIEVE IT.", subtext: "Earn your celebration." },
  { text: "DON'T STOP UNTIL YOU'RE PROUD.", subtext: "Set your own bar." },
  { text: "MAKE TODAY SO AWESOME YESTERDAY GETS JEALOUS.", subtext: "Outdo yourself daily." },
  { text: "YOU'RE NOT GOING TO MASTER THE REST OF YOUR LIFE IN ONE DAY. JUST RELAX. MASTER THE DAY.", subtext: "One day at a time." },
  { text: "TODAY'S STRUGGLE IS TOMORROW'S STRENGTH.", subtext: "Embrace the challenge." },
  { text: "SOMETIMES LATER BECOMES NEVER. DO IT NOW.", subtext: "Urgency creates results." },
  { text: "WEAK MINDS LEAD TO WEAK BODIES.", subtext: "Strengthen your mind." },
  { text: "YOU ARE THE CEO OF YOUR LIFE. HIRE, FIRE AND PROMOTE ACCORDINGLY.", subtext: "Take control." },
  { text: "DO WHAT YOU HAVE TO DO UNTIL YOU CAN DO WHAT YOU WANT TO DO.", subtext: "Pay your dues." },
  { text: "INVEST IN YOURSELF. IT PAYS THE BEST INTEREST.", subtext: "Self-development wins." },
  { text: "THE DISTANCE BETWEEN YOUR DREAMS AND REALITY IS CALLED ACTION.", subtext: "Bridge the gap." },
  { text: "YOUR LIMITATION IS ONLY YOUR IMAGINATION.", subtext: "Think bigger." },
  { text: "GREAT THINGS TAKE TIME.", subtext: "Patience with hustle." },
  { text: "MAKE MOVES, NOT EXCUSES.", subtext: "Action first. Always." },
  { text: "IF OPPORTUNITY DOESN'T KNOCK, BUILD A DOOR.", subtext: "Create your chances." },
  { text: "THE KEY TO SUCCESS IS TO FOCUS ON GOALS, NOT OBSTACLES.", subtext: "Eyes on the prize." },
  { text: "BE SO BUSY IMPROVING YOURSELF THAT YOU HAVE NO TIME TO CRITICIZE OTHERS.", subtext: "Focus inward." },
  { text: "SUCCESS IS NOT OWNED. IT'S RENTED. AND RENT IS DUE EVERY DAY.", subtext: "Daily commitment required." },
  { text: "WORK WHILE THEY SLEEP. LEARN WHILE THEY PARTY. LIVE LIKE THEY DREAM.", subtext: "Sacrifice pays off." },
  { text: "THE STRUGGLE YOU'RE IN TODAY IS DEVELOPING THE STRENGTH YOU NEED FOR TOMORROW.", subtext: "Growth through pain." },
  { text: "YOU DON'T ALWAYS GET WHAT YOU WISH FOR. YOU GET WHAT YOU WORK FOR.", subtext: "Effort determines outcome." },
  { text: "DO MORE OF WHAT MAKES YOU HAPPY.", subtext: "Joy fuels performance." },
  { text: "YOUR ENERGY INTRODUCES YOU BEFORE YOU EVEN SPEAK.", subtext: "Vibe matters." },
  { text: "IT'S GOING TO BE HARD, BUT HARD DOES NOT MEAN IMPOSSIBLE.", subtext: "Difficulty isn't defeat." },
  { text: "TAKE THE RISK OR LOSE THE CHANCE.", subtext: "Fortune favors the bold." },
  { text: "TURN YOUR WOUNDS INTO WISDOM.", subtext: "Learn from everything." },
  { text: "YOU WERE GIVEN THIS LIFE BECAUSE YOU ARE STRONG ENOUGH TO LIVE IT.", subtext: "You can handle it." },
  { text: "BE THE EXCEPTION, NOT THE RULE.", subtext: "Stand out always." },
  { text: "ATTITUDE IS A LITTLE THING THAT MAKES A BIG DIFFERENCE.", subtext: "Mindset changes everything." },
  { text: "STAY POSITIVE. WORK HARD. MAKE IT HAPPEN.", subtext: "Three-step formula." },
  { text: "YOUR SPEED DOESN'T MATTER. FORWARD IS FORWARD.", subtext: "Progress is progress." },
  { text: "WHAT FEELS LIKE THE END IS OFTEN THE BEGINNING.", subtext: "Restart when needed." },
  { text: "BE SAVAGE. NOT AVERAGE. BE ICONIC. NOT IRONIC.", subtext: "Live authentically." },
  { text: "YOU CAN'T GO BACK AND CHANGE THE BEGINNING, BUT YOU CAN START WHERE YOU ARE.", subtext: "Begin again now." },
  { text: "CHAMPIONS KEEP PLAYING UNTIL THEY GET IT RIGHT.", subtext: "Persistence wins championships." },
  { text: "THE PAIN OF DISCIPLINE IS FAR LESS THAN THE PAIN OF REGRET.", subtext: "Choose your pain." },
  { text: "START WHERE YOU ARE. USE WHAT YOU HAVE. DO WHAT YOU CAN.", subtext: "Work with what you got." },
  { text: "YOU'RE ALLOWED TO SCREAM. YOU'RE ALLOWED TO CRY. BUT DO NOT GIVE UP.", subtext: "Feel it. Keep going." },
  { text: "LIFE BEGINS AT THE END OF YOUR COMFORT ZONE.", subtext: "Push boundaries daily." },
  { text: "FOCUS ON THE STEP IN FRONT OF YOU, NOT THE WHOLE STAIRCASE.", subtext: "One step at a time." },
  { text: "YOU ARE NEVER TOO OLD TO SET ANOTHER GOAL OR TO DREAM A NEW DREAM.", subtext: "Age is just a number." },
  { text: "THE ONLY THING STANDING BETWEEN YOU AND YOUR GOAL IS THE STORY YOU KEEP TELLING YOURSELF.", subtext: "Change your story." },
  { text: "STORMS DON'T LAST FOREVER.", subtext: "This too shall pass." },
  { text: "STOP BEING AFRAID OF WHAT COULD GO WRONG AND START BEING EXCITED ABOUT WHAT COULD GO RIGHT.", subtext: "Shift perspective." },
  { text: "THE STRUGGLE IS PART OF THE STORY.", subtext: "Embrace your journey." },
  { text: "YOU DON'T HAVE TO BE PERFECT TO BE AMAZING.", subtext: "Excellence over perfection." },
  { text: "TOUGH TIMES DON'T LAST. TOUGH PEOPLE DO.", subtext: "Outlast the hardship." },
  { text: "SOMETIMES YOU WIN, SOMETIMES YOU LEARN.", subtext: "No true losses." },
  { text: "THE ROAD TO SUCCESS IS ALWAYS UNDER CONSTRUCTION.", subtext: "Constant evolution required." },
  { text: "YOUR FUTURE IS CREATED BY WHAT YOU DO TODAY, NOT TOMORROW.", subtext: "Act now." },
  { text: "BE PATIENT WITH YOURSELF. NOTHING IN NATURE BLOOMS ALL YEAR.", subtext: "Seasons of growth." },
  { text: "YOU DON'T NEED TO SEE THE WHOLE STAIRCASE. JUST TAKE THE FIRST STEP.", subtext: "Begin with courage." },
  { text: "A YEAR FROM NOW YOU'LL WISH YOU STARTED TODAY.", subtext: "Future regret motivates now." },
  { text: "CHANGE THE GAME. DON'T LET THE GAME CHANGE YOU.", subtext: "Stay true. Adapt smart." },
  { text: "RISE UP. START FRESH. SEE THE BRIGHT OPPORTUNITY IN EACH DAY.", subtext: "Daily renewal." },
  { text: "YOU DESERVE THE LIFE YOU'RE AFRAID TO DREAM OF.", subtext: "Dream bigger." },
  { text: "STARS CAN'T SHINE WITHOUT DARKNESS.", subtext: "Adversity creates brilliance." },
  { text: "IN THE END, WE ONLY REGRET THE CHANCES WE DIDN'T TAKE.", subtext: "Take the leap." },
  { text: "THE ONLY FAILURE IS NOT TRYING.", subtext: "Effort erases failure." },
  { text: "BE YOURSELF. EVERYONE ELSE IS ALREADY TAKEN.", subtext: "Authenticity wins." },
  { text: "WHEN NOTHING GOES RIGHT, GO LEFT.", subtext: "Adapt and pivot." },
  { text: "YOU'RE BRAVER THAN YOU BELIEVE, STRONGER THAN YOU SEEM, AND SMARTER THAN YOU THINK.", subtext: "Believe in yourself." },
  { text: "MAKE PEACE WITH YOUR PAST SO IT WON'T DISTURB YOUR PRESENT.", subtext: "Let go. Move forward." },
  { text: "IT'S NOT ABOUT PERFECT. IT'S ABOUT EFFORT.", subtext: "Consistency beats perfection." },
  { text: "DIFFICULT ROADS OFTEN LEAD TO BEAUTIFUL DESTINATIONS.", subtext: "Trust the process." },
  { text: "YOUR ONLY COMPETITION IS WHO YOU WERE YESTERDAY.", subtext: "Beat yourself daily." },
  { text: "WHATEVER YOU DECIDE TO DO, MAKE SURE IT MAKES YOU HAPPY.", subtext: "Joy is success." },
  { text: "DON'T CALL IT A DREAM. CALL IT A PLAN.", subtext: "Strategy over fantasy." },
  { text: "CREATE A LIFE THAT FEELS GOOD ON THE INSIDE, NOT ONE THAT JUST LOOKS GOOD ON THE OUTSIDE.", subtext: "Internal > External." },
  { text: "THE FUTURE BELONGS TO THOSE WHO BELIEVE IN THE BEAUTY OF THEIR DREAMS.", subtext: "Dream believers win." },
  { text: "YOU'RE NOT A DROP IN THE OCEAN. YOU'RE THE ENTIRE OCEAN IN A DROP.", subtext: "You're infinite." },
  { text: "BE FEARLESS IN PURSUIT OF WHAT MAKES YOU COME ALIVE.", subtext: "Chase your aliveness." },
  { text: "LIFE ISN'T ABOUT FINDING YOURSELF. IT'S ABOUT CREATING YOURSELF.", subtext: "Build who you are." },
  { text: "SHOW UP. WORK HARD. BE KIND. REPEAT.", subtext: "Simple winning formula." },
  { text: "THE HARDER THE CLIMB, THE BETTER THE VIEW.", subtext: "Struggle enhances victory." },
  { text: "IF YOU AREN'T WILLING TO WORK FOR IT, DON'T COMPLAIN ABOUT NOT HAVING IT.", subtext: "Effort or silence." },
  { text: "GET UP EVERY MORNING AND TELL YOURSELF: I CAN DO THIS.", subtext: "Daily affirmation matters." },
  { text: "BUILD A LIFE YOU DON'T NEED A VACATION FROM.", subtext: "Love your reality." },
  { text: "THE BEST PROJECT YOU'LL EVER WORK ON IS YOU.", subtext: "Self-improvement first." },
  { text: "ACTION IS THE FOUNDATIONAL KEY TO ALL SUCCESS.", subtext: "Move or die." },
  { text: "YOU ARE ENOUGH. YOU HAVE ENOUGH. YOU DO ENOUGH.", subtext: "You're complete now." },
  { text: "FORGET THE MISTAKE. REMEMBER THE LESSON.", subtext: "Learn and move on." },
  { text: "DO WHAT IS RIGHT, NOT WHAT IS EASY.", subtext: "Integrity over convenience." },
  { text: "NEVER GIVE UP ON A DREAM JUST BECAUSE OF THE TIME IT WILL TAKE TO ACCOMPLISH IT.", subtext: "Time passes anyway." },
  { text: "STAND UP FOR WHAT YOU BELIEVE IN EVEN IF YOU'RE STANDING ALONE.", subtext: "Conviction over popularity." },
  { text: "THE BEST IS YET TO COME.", subtext: "Your future is bright." },
  { text: "GROWTH IS PAINFUL. CHANGE IS PAINFUL. BUT NOTHING IS AS PAINFUL AS STAYING STUCK.", subtext: "Movement beats stagnation." },
  { text: "WHEN YOU FEEL LIKE QUITTING, THINK ABOUT WHY YOU STARTED.", subtext: "Remember your why." },
  { text: "COMPARISON IS THE THIEF OF JOY.", subtext: "Run your own race." },
  { text: "PROVE YOURSELF TO YOURSELF, NOT OTHERS.", subtext: "Internal validation wins." },
  { text: "WORK ON YOURSELF MORE THAN YOUR JOB.", subtext: "Self-development pays dividends." },
  { text: "DON'T WAIT FOR THE PERFECT MOMENT. TAKE THE MOMENT AND MAKE IT PERFECT.", subtext: "Create perfection now." },
  { text: "EVERY NEXT LEVEL OF YOUR LIFE WILL DEMAND A DIFFERENT VERSION OF YOU.", subtext: "Evolve constantly." },
  { text: "BE THE REASON SOMEONE SMILES TODAY.", subtext: "Spread positivity." },
  { text: "YOUR LIFE IS YOUR MESSAGE TO THE WORLD. MAKE SURE IT'S INSPIRING.", subtext: "Live with purpose." },
  { text: "SUCCESS IS A JOURNEY, NOT A DESTINATION.", subtext: "Enjoy the process." },
  { text: "BE PATIENT. GREAT THINGS TAKE TIME.", subtext: "Trust timing." },
  { text: "YOU HAVE POWER OVER YOUR MIND. NOT OUTSIDE EVENTS. REALIZE THIS AND YOU WILL FIND STRENGTH.", subtext: "Control what you can." },
  { text: "WHEN THE GOING GETS TOUGH, THE TOUGH GET GOING.", subtext: "Adversity reveals character." },
  { text: "DON'T BE PUSHED BY YOUR PROBLEMS. BE LED BY YOUR DREAMS.", subtext: "Vision pulls you forward." },
  { text: "THE ONLY IMPOSSIBLE JOURNEY IS THE ONE YOU NEVER BEGIN.", subtext: "Start or stay stuck." },
  { text: "YOU ARE CAPABLE OF AMAZING THINGS.", subtext: "Believe it. Achieve it." },
  { text: "HARD WORK BEATS TALENT WHEN TALENT DOESN'T WORK HARD.", subtext: "Effort trumps natural gifts." },
  { text: "CHANGE YOUR THOUGHTS AND YOU CHANGE YOUR WORLD.", subtext: "Mind creates reality." },
  { text: "DOUBT KILLS MORE DREAMS THAN FAILURE EVER WILL.", subtext: "Kill doubt. Chase dreams." },
  { text: "THE BEST TIME TO PLANT A TREE WAS 20 YEARS AGO. THE SECOND BEST TIME IS NOW.", subtext: "Start today." },
  { text: "WORK LIKE THERE IS SOMEONE WORKING 24 HOURS A DAY TO TAKE IT ALL AWAY FROM YOU.", subtext: "Stay hungry always." },
  { text: "YOU CAN'T BUILD A REPUTATION ON WHAT YOU'RE GOING TO DO.", subtext: "Do it now." },
  { text: "IF YOU'RE TIRED OF STARTING OVER, STOP GIVING UP.", subtext: "Persistence prevents restarts." },
  { text: "THE ONLY PERSON YOU'RE DESTINED TO BECOME IS THE PERSON YOU DECIDE TO BE.", subtext: "Choice shapes destiny." },
  { text: "FOCUS ON WHAT YOU CAN CONTROL.", subtext: "Let go of the rest." },
  { text: "THE STRUGGLE YOU'RE IN TODAY IS THE STRENGTH YOU'LL HAVE TOMORROW.", subtext: "Pain builds power." },
  { text: "EVERY SETBACK IS A SETUP FOR A COMEBACK.", subtext: "Failure fuels success." },
  { text: "IF IT WAS EASY, EVERYONE WOULD DO IT.", subtext: "Difficulty creates value." },
  { text: "WAKE UP DETERMINED. GO TO BED SATISFIED.", subtext: "Bookend your day right." },
  { text: "THE DREAM IS FREE. THE HUSTLE IS SOLD SEPARATELY.", subtext: "Vision requires effort." },
  { text: "MAKE YOURSELF A PRIORITY.", subtext: "Self-care enables performance." },
  { text: "DON'T LIMIT YOUR CHALLENGES. CHALLENGE YOUR LIMITS.", subtext: "Push boundaries constantly." },
  { text: "EVERYTHING YOU NEED IS ALREADY INSIDE YOU.", subtext: "You're already equipped." },
  { text: "BE SELECTIVE WITH YOUR BATTLES. SOMETIMES PEACE IS BETTER THAN BEING RIGHT.", subtext: "Choose wisely." },
  { text: "BUILD YOUR OWN DREAMS OR SOMEONE ELSE WILL HIRE YOU TO BUILD THEIRS.", subtext: "Create. Don't serve." },
  { text: "COURAGE IS NOT THE ABSENCE OF FEAR, BUT THE TRIUMPH OVER IT.", subtext: "Feel fear. Act anyway." },
  { text: "THE EXPERT IN ANYTHING WAS ONCE A BEGINNER WHO REFUSED TO QUIT.", subtext: "Persistence creates mastery." },
  { text: "YOUR TIME IS LIMITED. DON'T WASTE IT LIVING SOMEONE ELSE'S LIFE.", subtext: "Live authentically." },
  { text: "THE ONLY WAY TO ACHIEVE THE IMPOSSIBLE IS TO BELIEVE IT IS POSSIBLE.", subtext: "Belief precedes achievement." },
  { text: "STAY COMMITTED TO YOUR DECISIONS, BUT STAY FLEXIBLE IN YOUR APPROACH.", subtext: "Firm goals. Fluid methods." },
  { text: "WINNERS ARE NOT PEOPLE WHO NEVER FAIL, BUT PEOPLE WHO NEVER QUIT.", subtext: "Quitting is the only failure." },
  { text: "DO ONE THING EVERY DAY THAT SCARES YOU.", subtext: "Fear is growth." },
  { text: "EMBRACE THE GLORIOUS MESS THAT YOU ARE.", subtext: "Imperfection is human." },
  { text: "LIFE IS TOO SHORT TO WAIT.", subtext: "Seize every moment." },
  { text: "WORK UNTIL YOU DON'T HAVE TO INTRODUCE YOURSELF.", subtext: "Build legendary status." },
  { text: "DON'T BE AFRAID TO GIVE UP THE GOOD TO GO FOR THE GREAT.", subtext: "Good is the enemy of great." },
  { text: "THE FUTURE DEPENDS ON WHAT YOU DO TODAY.", subtext: "Today shapes tomorrow." },
  { text: "IF YOU CAN DREAM IT, YOU CAN DO IT.", subtext: "Vision enables reality." },
  { text: "STRENGTH DOESN'T COME FROM WHAT YOU CAN DO. IT COMES FROM OVERCOMING WHAT YOU THOUGHT YOU COULDN'T.", subtext: "Limits are lies." },
  { text: "YOU MISS 100% OF THE SHOTS YOU DON'T TAKE.", subtext: "Attempt everything." },
  { text: "AIM FOR THE MOON. IF YOU MISS, YOU'LL LAND AMONG THE STARS.", subtext: "Think massive." },
  { text: "DEDICATION SEES DREAMS COME TRUE.", subtext: "Commitment manifests." },
  { text: "SUCCESS IS THE SUM OF SMALL EFFORTS REPEATED DAY IN AND DAY OUT.", subtext: "Daily discipline compounds." },
  { text: "WHEN YOU WANT TO SUCCEED AS BAD AS YOU WANT TO BREATHE, THEN YOU'LL BE SUCCESSFUL.", subtext: "Desire determines outcome." },
  { text: "LIFE REWARDS ACTION.", subtext: "Movement creates opportunity." },
  { text: "IF YOU WANT SOMETHING YOU'VE NEVER HAD, YOU MUST BE WILLING TO DO SOMETHING YOU'VE NEVER DONE.", subtext: "New results need new actions." },
  { text: "FAILURE IS SIMPLY THE OPPORTUNITY TO BEGIN AGAIN, THIS TIME MORE INTELLIGENTLY.", subtext: "Learn and try again." },
  { text: "FORTUNE FAVORS THE BRAVE.", subtext: "Courage attracts luck." },
  { text: "NEVER LET SUCCESS GET TO YOUR HEAD. NEVER LET FAILURE GET TO YOUR HEART.", subtext: "Balance humility and confidence." },
  { text: "THE ONLY THING WORSE THAN BEING BLIND IS HAVING SIGHT BUT NO VISION.", subtext: "See beyond the obvious." },
  { text: "STRIVE NOT TO BE A SUCCESS, BUT RATHER TO BE OF VALUE.", subtext: "Contribute meaningfully." },
  { text: "THE MAGIC YOU'RE LOOKING FOR IS IN THE WORK YOU'RE AVOIDING.", subtext: "Do the hard thing." },
  { text: "YOUR GOALS DON'T CARE HOW YOU FEEL.", subtext: "Emotions don't determine effort." },
  { text: "STOP OVERTHINKING. JUST DO IT.", subtext: "Analysis paralysis kills." },
  { text: "THE UNIVERSE REWARDS ACTION, NOT INTENTION.", subtext: "Execute your ideas." },
  { text: "DISCIPLINE IS DOING WHAT NEEDS TO BE DONE EVEN WHEN YOU DON'T WANT TO DO IT.", subtext: "Character over comfort." },
  { text: "YOU ARE THE ARTIST OF YOUR LIFE. DON'T GIVE THE PAINTBRUSH TO ANYONE ELSE.", subtext: "Own your narrative." },
  { text: "IF YOU'RE NOT WILLING TO RISK THE USUAL, YOU'LL HAVE TO SETTLE FOR THE ORDINARY.", subtext: "Risk creates reward." },
  { text: "THE ONLY THING STANDING BETWEEN YOU AND YOUR DREAMS IS TIME AND EFFORT.", subtext: "Pay the price." },
  { text: "DO NOT GO WHERE THE PATH MAY LEAD. GO INSTEAD WHERE THERE IS NO PATH AND LEAVE A TRAIL.", subtext: "Blaze your own path." },
  { text: "STAY HUNGRY. STAY FOOLISH.", subtext: "Never lose curiosity." },
  { text: "THE MAN WHO MOVES A MOUNTAIN BEGINS BY CARRYING AWAY SMALL STONES.", subtext: "Start small. Think big." },
  { text: "IT ALWAYS SEEMS IMPOSSIBLE UNTIL IT'S DONE.", subtext: "Completion proves possibility." },
  { text: "THE ONLY GUARANTEE FOR FAILURE IS TO STOP TRYING.", subtext: "Persistence prevents failure." },
  { text: "LIFE IS 10% WHAT HAPPENS TO YOU AND 90% HOW YOU REACT TO IT.", subtext: "Response determines outcome." },
  { text: "BE A WARRIOR, NOT A WORRIER. BE A CREATOR, NOT A COMPLAINER.", subtext: "Build. Don't whine." },
  { text: "DON'T WATCH THE CLOCK; DO WHAT IT DOES. KEEP GOING.", subtext: "Relentless forward motion." },
  { text: "MAKE YOUR LIFE A MASTERPIECE.", subtext: "Create art daily." },
  { text: "THE ONLY PLACE SUCCESS COMES BEFORE WORK IS IN THE DICTIONARY.", subtext: "Work precedes results." },
  { text: "IF YOU WANT TO LIVE A HAPPY LIFE, TIE IT TO A GOAL, NOT TO PEOPLE OR THINGS.", subtext: "Purpose creates fulfillment." },
  { text: "EVERYTHING IS HARD BEFORE IT IS EASY.", subtext: "Difficulty is temporary." },
  { text: "THE BEST REVENGE IS LIVING WELL.", subtext: "Success silences critics." },
  { text: "WORK SMARTER, NOT HARDER.", subtext: "Efficiency beats effort alone." },
  { text: "YOU DON'T HAVE TO BE GREAT TO START. BUT YOU HAVE TO START TO BE GREAT.", subtext: "Beginning beats perfection." },
  { text: "FALL IN LOVE WITH THE PROCESS AND THE RESULTS WILL COME.", subtext: "Journey over destination." },
  { text: "IT'S NOT WHETHER YOU GET KNOCKED DOWN. IT'S WHETHER YOU GET UP.", subtext: "Rising defines character." },
  { text: "EVERY STRIKE BRINGS ME CLOSER TO THE NEXT HOME RUN.", subtext: "Failure breeds success." },
  { text: "WHAT WE FEAR DOING MOST IS USUALLY WHAT WE MOST NEED TO DO.", subtext: "Fear points to growth." },
  { text: "A GOAL WITHOUT A PLAN IS JUST A WISH.", subtext: "Strategy enables dreams." },
  { text: "THE DIFFERENCE BETWEEN TRY AND TRIUMPH IS JUST A LITTLE UMPH.", subtext: "Extra effort wins." },
  { text: "IT'S NOT ABOUT BEING THE BEST. IT'S ABOUT BEING BETTER THAN YOU WERE YESTERDAY.", subtext: "Personal progress matters." },
  { text: "STAY FOCUSED. GO AFTER YOUR DREAMS. KEEP MOVING TOWARD YOUR GOALS.", subtext: "Direction beats speed." },
  { text: "THE BEST WAY OUT IS ALWAYS THROUGH.", subtext: "Face it. Don't avoid it." },
  { text: "DON'T STOP WHEN IT HURTS. STOP WHEN YOU'RE DONE.", subtext: "Pain is temporary. Quitting is permanent." },
  { text: "BE THE CHANGE YOU WISH TO SEE IN THE WORLD.", subtext: "Lead by example." },
  { text: "THE ONLY THING MORE EXPENSIVE THAN EDUCATION IS IGNORANCE.", subtext: "Invest in learning." },
  { text: "ACTION CURES FEAR.", subtext: "Movement kills anxiety." },
  { text: "MAKE IT HAPPEN NOW, NOT TOMORROW. TOMORROW IS A LOSER'S EXCUSE.", subtext: "Today is all you have." },
  { text: "YOU ARE THE MAN YOU ARE MEANT TO BE.", subtext: "Embrace your strength. Celebrate your courage." },
];

export default function Home() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [timeUntilNext, setTimeUntilNext] = useState({ minutes: 0, seconds: 0 });
  const [copied, setCopied] = useState(false);
  const [showWidgetInfo, setShowWidgetInfo] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showQuoteSubmission, setShowQuoteSubmission] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('ttsEnabled');
      return saved === 'true';
    } catch {
      return false;
    }
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('voiceSettings');
      return saved ? JSON.parse(saved) : { voiceURI: '', rate: 1.0, pitch: 1.0, autoPlay: false };
    } catch {
      return { voiceURI: '', rate: 1.0, pitch: 1.0, autoPlay: false };
    }
  });
  
  // Load theme preferences
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('selectedTheme');
      return saved ? JSON.parse(saved) : THEMES[0];
    } catch {
      return THEMES[0];
    }
  });

  const [currentBackground, setCurrentBackground] = useState(() => {
    try {
      const saved = localStorage.getItem('selectedBackground');
      return saved ? JSON.parse(saved) : BACKGROUNDS[1];
    } catch {
      return BACKGROUNDS[1];
    }
  });

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    try {
      localStorage.setItem('selectedTheme', JSON.stringify(theme));
    } catch (e) {
      // Continue anyway
    }
  };

  const handleBackgroundChange = (background) => {
    setCurrentBackground(background);
    try {
      localStorage.setItem('selectedBackground', JSON.stringify(background));
    } catch (e) {
      // Continue anyway
    }
  };

  // Get a quote that hasn't been shown recently (within last 84 hours / 3.5 days)
  const getNextQuote = () => {
    const now = new Date();
    const currentHourKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}`;
    
    // Get history from localStorage
    let quoteHistory = [];
    try {
      const stored = localStorage.getItem('quoteHistory');
      if (stored) {
        quoteHistory = JSON.parse(stored);
      }
    } catch (e) {
      quoteHistory = [];
    }

    // Clean up history older than 7 days (168 hours)
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    quoteHistory = quoteHistory.filter(entry => entry.timestamp > sevenDaysAgo);

    // Count how many times each quote appeared in the last 7 days
    const quoteCounts = {};
    quoteHistory.forEach(entry => {
      quoteCounts[entry.index] = (quoteCounts[entry.index] || 0) + 1;
    });

    // Find quotes that have appeared less than 2 times in the last 7 days
    const availableQuotes = QUOTES.map((_, index) => index).filter(index => {
      return (quoteCounts[index] || 0) < 2;
    });

    // If all quotes have been shown twice, reset and allow all quotes
    const quotesToChooseFrom = availableQuotes.length > 0 ? availableQuotes : QUOTES.map((_, i) => i);

    // Select a random quote from available ones
    const randomIndex = quotesToChooseFrom[Math.floor(Math.random() * quotesToChooseFrom.length)];

    // Save to history
    quoteHistory.push({
      index: randomIndex,
      timestamp: Date.now(),
      hourKey: currentHourKey
    });

    try {
      localStorage.setItem('quoteHistory', JSON.stringify(quoteHistory));
    } catch (e) {
      // If localStorage fails, continue anyway
    }

    return randomIndex;
  };

  useEffect(() => {
    // Calculate quote index based on smart rotation
    const updateQuote = () => {
      const now = new Date();
      const currentHourKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}`;
      
      // Check if we already selected a quote for this hour
      try {
        const storedHourKey = localStorage.getItem('currentHourKey');
        const storedQuoteIndex = localStorage.getItem('currentQuoteIndex');
        
        if (storedHourKey === currentHourKey && storedQuoteIndex !== null) {
          // Use the same quote for this hour
          setCurrentQuoteIndex(parseInt(storedQuoteIndex));
          return;
        }
      } catch (e) {
        // Continue to select new quote
      }

      // New hour - select a new quote
      const newIndex = getNextQuote();
      setCurrentQuoteIndex(newIndex);
      
      try {
        localStorage.setItem('currentHourKey', currentHourKey);
        localStorage.setItem('currentQuoteIndex', newIndex.toString());
      } catch (e) {
        // If localStorage fails, continue anyway
      }
    };

    // Calculate time until next hour
    const updateTimer = () => {
      const now = new Date();
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();
      setTimeUntilNext({ minutes, seconds });
    };

    updateQuote();
    updateTimer();

    const interval = setInterval(() => {
      updateTimer();
      updateQuote();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = QUOTES[currentQuoteIndex];

  const speakText = (text, subtext) => {
    if (!window.speechSynthesis) {
      toast.error("Text-to-speech not supported in this browser");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(`${text}. ${subtext}`);
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = 1.0;

    // Set selected voice
    if (voiceSettings.voiceURI) {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.voiceURI === voiceSettings.voiceURI);
      if (voice) utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast.error("Speech failed");
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleTTS = () => {
    const newValue = !ttsEnabled;
    setTtsEnabled(newValue);
    try {
      localStorage.setItem('ttsEnabled', newValue.toString());
    } catch {
      // Continue anyway
    }
    if (newValue) {
      toast.success("Audio enabled 🔊");
      speakText(currentQuote.text, currentQuote.subtext);
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      toast.success("Audio disabled 🔇");
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Auto-play quote when it changes if auto-play is enabled
  useEffect(() => {
    if (ttsEnabled && voiceSettings.autoPlay && currentQuote) {
      // Small delay to let the animation settle
      const timer = setTimeout(() => {
        speakText(currentQuote.text, currentQuote.subtext);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentQuoteIndex, ttsEnabled, voiceSettings.autoPlay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const copyQuote = () => {
    navigator.clipboard.writeText(`${currentQuote.text}\n\n— ${currentQuote.subtext}`);
    setCopied(true);
    toast.success("Quote copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareQuote = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Daily Motivation',
        text: `${currentQuote.text}\n\n— ${currentQuote.subtext}`,
      });
    } else {
      copyQuote();
    }
  };

  const renderBackground = () => {
    if (currentBackground.type === 'image') {
      return (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentBackground.url})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      );
    }

    if (currentBackground.type === 'pattern') {
      let patternStyle = {};
      if (currentBackground.pattern === 'grid') {
        patternStyle = {
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        };
      } else if (currentBackground.pattern === 'dots') {
        patternStyle = {
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        };
      } else if (currentBackground.pattern === 'waves') {
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black">
            <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M0 50 Q 25 30, 50 50 T 100 50" fill="none" stroke="white" strokeWidth="1"/>
                  <path d="M0 70 Q 25 50, 50 70 T 100 70" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#waves)"/>
            </svg>
          </div>
        );
      }
      return <div className="absolute inset-0 opacity-[0.5]" style={patternStyle} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background */}
      {renderBackground()}

      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br ${currentTheme.gradient} rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl ${currentTheme.gradient} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 md:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTheme.accent} flex items-center justify-center`}>
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">LION MODE</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white/40 text-sm font-mono">
              <Clock className="w-4 h-4" />
              <span>
                {String(timeUntilNext.minutes).padStart(2, '0')}:{String(timeUntilNext.seconds).padStart(2, '0')}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTTS}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowVoiceSettings(true);
              }}
              className={`${ttsEnabled ? 'text-white' : 'text-white/40'} hover:text-white hover:bg-white/5`}
              title="Click to toggle audio, right-click for settings"
            >
              {ttsEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowThemeSelector(true)}
              className="text-white/40 hover:text-white hover:bg-white/5"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Main Quote Section */}
        <main className="flex-1 flex items-center justify-center px-6 md:px-12 py-12">
          <div className="max-w-4xl w-full space-y-8">
            {/* Daily Goal Section */}
            <DailyGoal currentTheme={currentTheme} />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuoteIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                {/* Quote number */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                >
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentTheme.accent} animate-pulse`} />
                  <span className="text-xs font-medium text-white/50 uppercase tracking-widest">
                    Hour {new Date().getHours()}:00 Motivation
                  </span>
                </motion.div>

                {/* Main quote */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                    {currentQuote.text}
                  </span>
                </h1>

                {/* Subtext */}
                <p className="text-lg md:text-xl text-white/40 font-light tracking-wide mb-12">
                  {currentQuote.subtext}
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                  {isSpeaking ? (
                    <Button
                      onClick={stopSpeaking}
                      size="sm"
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full px-4 md:px-6 py-2 md:py-6 transition-all duration-300"
                    >
                      <VolumeX className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                      <span className="hidden md:inline">Stop</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => speakText(currentQuote.text, currentQuote.subtext)}
                      size="sm"
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full px-4 md:px-6 py-2 md:py-6 transition-all duration-300"
                    >
                      <Volume2 className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                      <span className="hidden md:inline">Listen</span>
                    </Button>
                  )}

                  <Button
                    onClick={copyQuote}
                    size="sm"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full px-4 md:px-6 py-2 md:py-6 transition-all duration-300"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 md:w-5 md:h-5 md:mr-2 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                    )}
                    <span className="hidden md:inline">{copied ? "Copied!" : "Copy"}</span>
                  </Button>

                  <Button
                    onClick={shareQuote}
                    size="sm"
                    className={`bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white rounded-full px-4 md:px-6 py-2 md:py-6 transition-all duration-300 shadow-lg`}
                  >
                    <Share2 className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                    <span className="hidden md:inline">Share</span>
                  </Button>

                  <Button
                    onClick={() => setShowQuoteSubmission(true)}
                    size="sm"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full px-4 md:px-6 py-2 md:py-6 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                    <span className="hidden md:inline">Submit</span>
                  </Button>

                  <Button
                    onClick={() => setShowAIGenerator(true)}
                    size="sm"
                    className={`bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white rounded-full px-4 md:px-6 py-2 md:py-6 transition-all duration-300`}
                  >
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                    <span className="hidden md:inline">AI Quote</span>
                  </Button>
                  </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Widget Info Section */}
        <footer className="p-6 md:p-8">
          <button
            onClick={() => setShowWidgetInfo(!showWidgetInfo)}
            className="w-full flex items-center justify-center gap-2 text-white/30 hover:text-white/50 transition-colors text-sm font-medium"
          >
            <span>How to add as widget</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showWidgetInfo ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showWidgetInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-6 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* iPhone Widget */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg">
                        📱
                      </div>
                      <h3 className="font-bold">iPhone Widget</h3>
                    </div>
                    <ol className="space-y-2 text-sm text-white/60">
                      <li className="flex gap-2">
                        <span className={`${currentTheme.accentSolid.replace('bg-', 'text-')} font-bold`}>1.</span>
                        Open Safari, go to this app
                      </li>
                      <li className="flex gap-2">
                        <span className={`${currentTheme.accentSolid.replace('bg-', 'text-')} font-bold`}>2.</span>
                        Tap Share → Add to Home Screen
                      </li>
                      <li className="flex gap-2">
                        <span className={`${currentTheme.accentSolid.replace('bg-', 'text-')} font-bold`}>3.</span>
                        Long press home → Edit → Add Widget
                      </li>
                      <li className="flex gap-2">
                        <span className={`${currentTheme.accentSolid.replace('bg-', 'text-')} font-bold`}>4.</span>
                        Search "Lion Mode" and add
                      </li>
                    </ol>
                  </div>

                  {/* MacBook Background */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-lg">
                        💻
                      </div>
                      <h3 className="font-bold">MacBook Background</h3>
                    </div>
                    <ol className="space-y-2 text-sm text-white/60">
                      <li className="flex gap-2">
                        <span className={`${currentTheme.accentSolid.replace('bg-', 'text-')} font-bold`}>1.</span>
                        Take a screenshot (Cmd + Shift + 3)
                      </li>
                      <li className="flex gap-2">
                        <span className={`${currentTheme.accentSolid.replace('bg-', 'text-')} font-bold`}>2.</span>
                        System Settings → Wallpaper
                      </li>
                      <li className="flex gap-2">
                        <span className={`${currentTheme.accentSolid.replace('bg-', 'text-')} font-bold`}>3.</span>
                        Add Folder → Select screenshot
                      </li>
                      <li className="flex gap-2">
                        <span className={`${currentTheme.accentSolid.replace('bg-', 'text-')} font-bold`}>4.</span>
                        Enable "Change picture every hour"
                      </li>
                    </ol>
                  </div>
                </div>

                <p className="text-center text-white/20 text-xs mt-6">
                  Pro tip: Bookmark this page and check hourly for fresh motivation 🔥
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </footer>
      </div>

      {/* Theme Selector Modal */}
      <ThemeSelector
        isOpen={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
        currentTheme={currentTheme}
        currentBackground={currentBackground}
        onThemeChange={handleThemeChange}
        onBackgroundChange={handleBackgroundChange}
      />

      {/* Quote Submission Modal */}
      <QuoteSubmission
        isOpen={showQuoteSubmission}
        onClose={() => setShowQuoteSubmission(false)}
        currentTheme={currentTheme}
      />

      {/* Voice Settings Modal */}
      <VoiceSettings
        isOpen={showVoiceSettings}
        onClose={() => setShowVoiceSettings(false)}
        currentTheme={currentTheme}
        onSettingsChange={setVoiceSettings}
      />

      {/* AI Quote Generator Modal */}
      <AIQuoteGenerator
        isOpen={showAIGenerator}
        onClose={() => setShowAIGenerator(false)}
        currentTheme={currentTheme}
      />
    </div>
  );
}