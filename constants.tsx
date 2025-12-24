
import { EvolutionaryData } from './types';

export const EVOLUTIONARY_DATA: EvolutionaryData = {
  energySources: [
    {
      id: 'herbivore',
      label: 'צמחוני',
      icon: '🌿',
      description: 'ניזון מחומר צמחי (עלים, פירות, שורשים).',
      pros: 'מזון זמין יחסית ברוב הסביבות',
      cons: 'מגביל אותך במערכת עיכול מורכבת ואנרגיה נמוכה'
    },
    {
      id: 'carnivore',
      label: 'טורף',
      icon: '🥩',
      description: 'ניזון מבעלי חיים אחרים.',
      pros: 'מזון עשיר באנרגיה',
      cons: 'מגביל אותך בצורך במרדף וסיכון לפציעה'
    },
    {
      id: 'omnivore',
      label: 'אוכל-כל',
      icon: '🥘',
      description: 'ניזון גם מצמחים וגם מבעלי חיים.',
      pros: 'גמישות תזונתית גבוהה',
      cons: 'מגביל אותך בחוסר התמחות'
    }
  ],
  habitats: [
    {
      id: 'ocean',
      label: 'ים',
      icon: '🌊',
      description: 'עולם המים המלוחים.',
      challenges: ['לחץ מים גבוה בעומק', 'מליחות הדורשת ויסות'],
      opportunities: ['תמיכה במשקל הגוף על ידי המים']
    },
    {
      id: 'freshwater',
      label: 'מים מתוקים',
      icon: '💧',
      description: 'אגמים, נהרות ומקווי מים ללא מלח.',
      challenges: ['שינויי זרימה', 'ויסות מלחים בגוף', 'רמות חמצן משתנות'],
      opportunities: ['מגוון מזון צמחי', 'קלות יחסית במציאת מחסה']
    },
    {
      id: 'land',
      label: 'יבשה',
      icon: '🏜️',
      description: 'סביבות יבשתיות מגוונות.',
      challenges: ['צורך בתמיכה מבנית', 'סכנת התייבשות'],
      opportunities: ['שפע חמצן זמין']
    },
    {
      id: 'extreme',
      label: 'סביבה קיצונית',
      icon: '🌋',
      description: 'מדבר לוהט, קוטב קפוא או ביצות.',
      challenges: ['מחסור במים או טמפרטורה עזה'],
      opportunities: ['מעט תחרות עם מינים אחרים']
    }
  ],
  subHabitats: {
    ocean: [
      { id: 'coral_reef', label: 'שונית אלמוגים', icon: '🪸', description: 'סביבה עשירה בצבעים, מסתור ומזון.' },
      { id: 'open_sea', label: 'ים פתוח', icon: '🐬', description: 'מרחבים עצומים, זרמים חזקים ומעט מקומות מחסה.' },
      { id: 'deep_sea', label: 'מעמקי הים', icon: '🏮', description: 'חושך מוחלט, לחץ עצום וטמפרטורה נמוכה.' }
    ],
    freshwater: [
      { id: 'lakes', label: 'אגמים', icon: '🛶', description: 'מים עומדים, גופי מים גדולים עם שכבות טמפרטורה.' },
      { id: 'rivers', label: 'נהרות', icon: '🐟', description: 'מים זורמים, דורש התמודדות עם סחיפה וזרם.' }
    ],
    land: [
      { id: 'forest', label: 'יער', icon: '🌲', description: 'צמחייה סבוכה, הרבה מקומות מסתור וטיפוס.' },
      { id: 'savannah', label: 'סוואנה', icon: '🦁', description: 'ערבות עשב פתוחות עם עונות יבשות ורטובות.' },
      { id: 'hills', label: 'גבעות', icon: '⛰️', description: 'שטח משופע הדורש שיווי משקל ויציבות.' },
      { id: 'grove', label: 'חורש', icon: '🌳', description: 'שילוב של עצים נמוכים ושיחים.' }
    ],
    extreme: [
      { id: 'desert', label: 'מדבר', icon: '🐫', description: 'חום קיצוני ביום, מחסור חמור במים.' },
      { id: 'mountains', label: 'הרים גבוהים', icon: '🏔️', description: 'אוויר דליל בחמצן, קור עז וסלעים תלולים.' },
      { id: 'tundra', label: 'טונדרה', icon: '❄️', description: 'קפוא רוב השנה, צמחייה נמוכה בלבד.' }
    ]
  },
  movements: [
    // Water
    { id: 'swim_fins', label: 'שחייה באמצעות סנפירים', icon: '🐠', description: 'תנועה הידרודינמית יעילה במים פתוחים.' },
    { id: 'swim_undulatory', label: 'שחייה בגלי גוף', icon: '🐍', description: 'תנועה נחשית פתלתלה במים או בבוץ.' },
    { id: 'float_currents', label: 'ריחוף / ציפה עם זרמים', icon: '🎐', description: 'חיסכון מקסימלי באנרגיה על ידי היסחפות.' },
    { id: 'bottom_crawl', label: 'תנועה על הקרקעית', icon: '🦀', description: 'זחילה או הליכה יציבה על קרקעית מקווי מים.' },
    // Land
    { id: 'walk_stable', label: 'הליכה איטית ויציבה', icon: '🐢', description: 'תנועה יבשתית חסכונית ובטוחה.' },
    { id: 'run_fast', label: 'ריצה מהירה', icon: '🐆', description: 'מהירות גבוהה למרדף או בריחה.' },
    { id: 'jump', label: 'קפיצה', icon: '🦘', description: 'תנועה מתפרצת למעבר מכשולים או התחמקות.' },
    { id: 'land_crawl', label: 'זחילה יבשתית', icon: '🦎', description: 'תנועה צמודה לקרקע, מתאימה למסתור.' },
    { id: 'climb', label: 'טיפוס (עצים / סלעים)', icon: '🐒', description: 'תנועה במרחב אנכי בסביבות סבוכות.' },
    // Air
    { id: 'fly_active', label: 'תעופה פעילה (כנפיים)', icon: '🦅', description: 'תנועה תלת-ממדית מלאה באוויר.' },
    { id: 'glide', label: 'דאייה / גלישה', icon: '✈️', description: 'שימוש בזרמי אוויר למעבר מרחקים גדולים.' },
    { id: 'jump_controlled', label: 'קפיצה ממושכת מבוקרת', icon: '🐿️', description: 'נחיתה רכה ודיוק במעבר בין גבהים.' },
    // Combined
    { id: 'dual_water_land', label: 'תנועה מים-יבשה', icon: '🐸', description: 'יכולת תנועה מגוונת בשני העולמות.' },
    { id: 'dual_land_air', label: 'תנועה יבשה-אוויר', icon: '🦋', description: 'שילוב של תנועה קרקעית ויכולת המראה.' },
    { id: 'dual_water_air', label: 'תנועה מים-אוויר', icon: '🐟', description: 'יכולת זינוק מהמים למעוף קצר.' },
    // Minimal
    { id: 'stationary', label: 'נייח / כמעט נייח', icon: '🐚', description: 'הישארות במקום אחד לאורך זמן.' },
    { id: 'very_slow', label: 'תנועה איטית מאוד', icon: '🐌', description: 'קצב איטי השומר על משאבים.' },
    { id: 'env_reliance', label: 'הסתמכות על הסביבה', icon: '🍃', description: 'תנועה פסיבית המבוססת על רוח או זרם.' }
  ],
  bodyPlans: [
    { id: 'tubular', label: 'גוף מאורך / צינורי', icon: '🐍', description: 'מתאים למעבר במחילות או שחייה מהירה.' },
    { id: 'flat', label: 'גוף רחב ושטוח', icon: '🛹', description: 'מתאים להסוואה על הקרקעית או דאייה.' },
    { id: 'massive', label: 'גוף קומפקטי / מסיבי', icon: '🦏', description: 'שומר על חום גוף ומעניק חוזק פיזי.' },
    { id: 'flexible', label: 'גוף גמיש ורך', icon: '🐙', description: 'מאפשר כניסה למקומות צרים ותנועה פתלתלה.' },
    { id: 'segmented', label: 'גוף מפרקי / מקוטע', icon: '🐛', description: 'מעניק טווח תנועה גדול ושריון מודולרי.' }
  ],
  defenseMechanisms: [
    { id: 'camo', label: 'הסוואה', icon: '🎭', description: 'היטמעות בסביבה למניעת גילוי.' },
    { id: 'armor', label: 'שריון / קוצים', icon: '🛡️', description: 'הגנה פיזית קשיחה נגד טורפים.' },
    { id: 'poison', label: 'רעל', icon: '🧪', description: 'הרתעה כימית או שיתוק האויב.' },
    { id: 'speed', label: 'מהירות', icon: '⚡', description: 'יכולת בריחה מהירה מאיומים.' },
    { id: 'group', label: 'חיים בקבוצה', icon: '🤝', description: 'הגנה משותפת והתראה מוקדמת.' }
  ],
  reproductionStrategies: [
    {
      id: 'r_strategy',
      label: 'הרבה צאצאים, מעט השקעה',
      icon: '🥚',
      description: 'הישרדות מבוססת כמות גדולה.'
    },
    {
      id: 'k_strategy',
      label: 'מעט צאצאים, הרבה השקעה',
      icon: '🤱',
      description: 'הישרדות מבוססת טיפול איכותי.'
    }
  ]
};
