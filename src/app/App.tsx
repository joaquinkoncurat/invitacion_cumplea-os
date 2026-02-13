import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PartyPopper, 
  ChevronRight, 
  Beer, 
  Pizza, 
  Music, 
  Heart,
  Flame,
  Ghost,
  Users,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Checkbox } from './components/ui/checkbox';
import { Slider } from './components/ui/slider';
import { Textarea } from './components/ui/textarea';

type FormData = {
  name: string;
  attending: string;
  noReason: string;
  vibe: string;
  guestCount: string;
  companions: string;
  bringing: string[];
  partyLevel: number[];
  acceptTerms: boolean;
};

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    attending: '',
    noReason: '',
    vibe: '',
    guestCount: '',
    companions: '',
    bringing: [],
    partyLevel: [5],
    acceptTerms: false
  });
  const [score, setScore] = useState(0);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Sistema de puntuación divertido
    if (step === 2 && formData.attending !== 'no') setScore(prev => prev + 10);
    if (step === 3 && formData.vibe === 'fiesta') setScore(prev => prev + 15);
    if (step === 7 && formData.partyLevel[0] >= 8) setScore(prev => prev + 10);
    
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.name.trim() !== '';
      case 2: return formData.attending !== '';
      case 3: 
        if (formData.attending === 'no') return formData.noReason.trim() !== '';
        return formData.vibe !== '';
      case 4: return formData.guestCount !== '';
      case 5: return true; // Campo opcional
      case 6: return formData.bringing.length > 0;
      case 7: return true; // Slider siempre tiene valor
      case 8: return formData.acceptTerms;
      default: return true;
    }
  };

  const getVibeEmoji = (vibe: string) => {
    switch (vibe) {
      case 'tranqui': return '😌';
      case 'fiesta': return '🔥';
      case 'emocional': return '😭';
      case 'npc': return '🧍';
      default: return '🎉';
    }
  };

  const getBringingEmoji = (item: string) => {
    switch (item) {
      case 'alcohol': return '🍺';
      case 'gaseosa': return '🥤';
      case 'comida': return '🍕';
      case 'sorpresa': return '🎁';
      case 'hambre': return '🤤';
      default: return '✨';
    }
  };

  // Pantalla de bienvenida
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <PartyPopper className="w-24 h-24 mx-auto mb-6 text-pink-500" />
          </motion.div>
          
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ¡CUMPLEAÑOS ÉPICO! 🎂
          </h1>
          
          <div className="space-y-3 mb-8 text-lg">
            <p className="text-gray-700">
              Estás a punto de confirmar tu asistencia al evento del año
            </p>
            <p className="text-2xl font-bold text-purple-600">
              (o al menos del mes, no exageremos)
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8 space-y-3">
            <div className="flex items-center justify-center gap-2 text-gray-800">
              <Calendar className="w-5 h-5" />
              <span className="font-bold">21 de Febrero, 21hs</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-800">
              <MapPin className="w-5 h-5" />
              <span className="font-bold">Quincho - Obispo Oro 440</span>
            </div>
          </div>

          <p className="text-xl font-bold text-gray-700 mb-6">
            ⚠️ Completá este formulario para confirmar ⚠️
          </p>
          
          <p className="text-sm text-gray-600 mb-8">
            No es joda, si no completás esto, no entrás. <br />
            (Bueno sí entrás, pero haceme el favor)
          </p>

          <Button
            onClick={nextStep}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            ARRANCAR LA AVENTURA 🚀
          </Button>

          <p className="text-xs text-gray-500 mt-6">
            * Experiencia interactiva. Se recomienda buen humor.
          </p>
        </motion.div>
      </div>
    );
  }

  // Pregunta 1: Nombre
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full"
        >
          <div className="mb-6">
            <span className="text-sm font-bold text-purple-600">PREGUNTA 1/8</span>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{ width: '12.5%' }}></div>
            </div>
          </div>

          <h2 className="text-4xl font-black mb-4 text-gray-800">
            ¿Cómo te llamás? 🤔
          </h2>
          
          <p className="text-gray-600 mb-8">
            Dale, tirame un nombre. Si ponés "Batman" te voy a creer igual.
          </p>

          <div className="space-y-4">
            <Label htmlFor="name" className="text-lg">Tu nombre (o alias)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ej: El Papu"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="text-lg p-6 border-2 border-gray-300 rounded-xl"
              autoFocus
            />
          </div>

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl py-6 rounded-xl disabled:opacity-50"
          >
            SIGUIENTE <ChevronRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Pregunta 2: ¿Vas a venir?
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full"
        >
          <div className="mb-6">
            <span className="text-sm font-bold text-teal-600">PREGUNTA 2/8</span>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>

          <h2 className="text-4xl font-black mb-4 text-gray-800">
            {formData.name}, ¿vas a venir a mi cumple? 🎉
          </h2>
          
          <p className="text-gray-600 mb-8">
            Momento de la verdad. Elegí sabiamente.
          </p>

          <RadioGroup value={formData.attending} onValueChange={(value) => updateField('attending', value)}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 mb-4 cursor-pointer hover:border-green-500 hover:bg-green-50"
            >
              <RadioGroupItem value="si" id="si" />
              <Label htmlFor="si" className="text-xl cursor-pointer flex-1">
                Sí, ahí estoy ✅
              </Label>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 mb-4 cursor-pointer hover:border-green-500 hover:bg-green-50"
            >
              <RadioGroupItem value="obvio" id="obvio" />
              <Label htmlFor="obvio" className="text-xl cursor-pointer flex-1">
                Obvio papá, ¿qué pregunta es esa? 🔥
              </Label>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 cursor-pointer hover:border-red-500 hover:bg-red-50"
            >
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="text-xl cursor-pointer flex-1">
                No... (preparate para justificar) 😢
              </Label>
            </motion.div>
          </RadioGroup>

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="mt-8 w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-xl py-6 rounded-xl disabled:opacity-50"
          >
            SIGUIENTE <ChevronRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Pregunta 3: Si dijo NO o Vibe
  if (step === 3) {
    if (formData.attending === 'no') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 flex items-center justify-center p-4">
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full"
          >
            <div className="mb-6">
              <span className="text-sm font-bold text-orange-600">PREGUNTA 3/8</span>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div className="bg-gradient-to-r from-orange-600 to-yellow-600 h-2 rounded-full" style={{ width: '37.5%' }}></div>
              </div>
            </div>

            <h2 className="text-4xl font-black mb-4 text-gray-800">
              ¿POR QUÉ NO VENÍS? 😭
            </h2>
            
            <p className="text-gray-600 mb-8">
              Esto me duele más a mí que a vos. Dame una buena excusa al menos.
            </p>

            <div className="space-y-4">
              <Label htmlFor="noReason" className="text-lg">Tu excusa (que sea buena eh)</Label>
              <Textarea
                id="noReason"
                placeholder="Ej: Me secuestraron aliens / Tengo que pasear al pez / Netflix estrenó temporada nueva"
                value={formData.noReason}
                onChange={(e) => updateField('noReason', e.target.value)}
                className="text-lg p-4 border-2 border-gray-300 rounded-xl min-h-32"
                autoFocus
              />
            </div>

            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="mt-8 w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white text-xl py-6 rounded-xl disabled:opacity-50"
            >
              ENVIAR EXCUSA <ChevronRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full"
        >
          <div className="mb-6">
            <span className="text-sm font-bold text-pink-600">PREGUNTA 3/8</span>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-gradient-to-r from-pink-600 to-red-600 h-2 rounded-full" style={{ width: '37.5%' }}></div>
            </div>
          </div>

          <h2 className="text-4xl font-black mb-4 text-gray-800">
            ¿Qué versión tuya viene? 🎭
          </h2>
          
          <p className="text-gray-600 mb-8">
            Necesito saber con qué personaje del lore voy a interactuar.
          </p>

          <RadioGroup value={formData.vibe} onValueChange={(value) => updateField('vibe', value)}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 mb-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50"
            >
              <RadioGroupItem value="tranqui" id="tranqui" />
              <Label htmlFor="tranqui" className="text-xl cursor-pointer flex-1">
                😌 Tranquilo/a - Modo espectador
              </Label>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 mb-4 cursor-pointer hover:border-orange-500 hover:bg-orange-50"
            >
              <RadioGroupItem value="fiesta" id="fiesta" />
              <Label htmlFor="fiesta" className="text-xl cursor-pointer flex-1">
                🔥 Fiesta total - El alma de la party
              </Label>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 mb-4 cursor-pointer hover:border-purple-500 hover:bg-purple-50"
            >
              <RadioGroupItem value="emocional" id="emocional" />
              <Label htmlFor="emocional" className="text-xl cursor-pointer flex-1">
                😭 Borracho/a emocional - "Te quiero mucho bro"
              </Label>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 cursor-pointer hover:border-gray-500 hover:bg-gray-50"
            >
              <RadioGroupItem value="npc" id="npc" />
              <Label htmlFor="npc" className="text-xl cursor-pointer flex-1">
                🧍 NPC del fondo - Solo paso a saludar
              </Label>
            </motion.div>
          </RadioGroup>

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="mt-8 w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white text-xl py-6 rounded-xl disabled:opacity-50"
          >
            SIGUIENTE <ChevronRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Pregunta 4: ¿Cuántos vienen?
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full"
        >
          <div className="mb-6">
            <span className="text-sm font-bold text-blue-600">PREGUNTA 4/8</span>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>

          <h2 className="text-4xl font-black mb-4 text-gray-800">
            ¿Cuántas personas vienen? 👥
          </h2>
          
          <p className="text-gray-600 mb-8">
            Contate a vos también. No seas modesto/a.
          </p>

          <div className="space-y-4">
            <Label htmlFor="guestCount" className="text-lg">Cantidad total (incluyéndote)</Label>
            <Input
              id="guestCount"
              type="number"
              min="1"
              max="50"
              placeholder="Ej: 3"
              value={formData.guestCount}
              onChange={(e) => updateField('guestCount', e.target.value)}
              className="text-lg p-6 border-2 border-gray-300 rounded-xl"
              autoFocus
            />
            {formData.guestCount && parseInt(formData.guestCount) > 10 && (
              <p className="text-orange-600 text-sm">
                🤨 ¿Tanto? Bueno, mientras traigan bebida...
              </p>
            )}
          </div>

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl py-6 rounded-xl disabled:opacity-50"
          >
            SIGUIENTE <ChevronRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Pregunta 5: ¿Con quién venís?
  if (step === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full"
        >
          <div className="mb-6">
            <span className="text-sm font-bold text-teal-600">PREGUNTA 5/8</span>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 h-2 rounded-full" style={{ width: '62.5%' }}></div>
            </div>
          </div>

          <h2 className="text-4xl font-black mb-4 text-gray-800">
            ¿Con quién venís? 🤝
          </h2>
          
          <p className="text-gray-600 mb-8">
            Tirame los nombres de tu squad. Si venís solo/a, ponele "Conmigo mismo/a" y listo.
          </p>

          <div className="space-y-4">
            <Label htmlFor="companions" className="text-lg">Nombres de tus acompañantes</Label>
            <Textarea
              id="companions"
              placeholder="Ej: Juan, María y el perro (sí, el perro cuenta)"
              value={formData.companions}
              onChange={(e) => updateField('companions', e.target.value)}
              className="text-lg p-4 border-2 border-gray-300 rounded-xl min-h-24"
              autoFocus
            />
            <p className="text-sm text-gray-500">
              Opcional, pero sum a que me avives quién cae.
            </p>
          </div>

          <Button
            onClick={nextStep}
            className="mt-8 w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xl py-6 rounded-xl"
          >
            SIGUIENTE <ChevronRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Pregunta 6: ¿Qué vas a traer?
  if (step === 6) {
    const toggleBringing = (item: string) => {
      const current = formData.bringing;
      if (current.includes(item)) {
        updateField('bringing', current.filter(i => i !== item));
      } else {
        updateField('bringing', [...current, item]);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full"
        >
          <div className="mb-6">
            <span className="text-sm font-bold text-red-600">PREGUNTA 6/8</span>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <h2 className="text-4xl font-black mb-4 text-gray-800">
            ¿Qué vas a traer o tomar? 🍻
          </h2>
          
          <p className="text-gray-600 mb-8">
            Podés marcar varias opciones. Cuanto más, mejor.
          </p>

          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 cursor-pointer hover:border-orange-500 hover:bg-orange-50"
              onClick={() => toggleBringing('alcohol')}
            >
              <Checkbox 
                id="alcohol"
                checked={formData.bringing.includes('alcohol')}
                onCheckedChange={() => toggleBringing('alcohol')}
              />
              <Label htmlFor="alcohol" className="text-xl cursor-pointer flex-1">
                🍺 Alcohol (lo más importante)
              </Label>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50"
              onClick={() => toggleBringing('gaseosa')}
            >
              <Checkbox 
                id="gaseosa"
                checked={formData.bringing.includes('gaseosa')}
                onCheckedChange={() => toggleBringing('gaseosa')}
              />
              <Label htmlFor="gaseosa" className="text-xl cursor-pointer flex-1">
                🥤 Gaseosa (para los que manejan o son aburridos)
              </Label>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 cursor-pointer hover:border-yellow-500 hover:bg-yellow-50"
              onClick={() => toggleBringing('comida')}
            >
              <Checkbox 
                id="comida"
                checked={formData.bringing.includes('comida')}
                onCheckedChange={() => toggleBringing('comida')}
              />
              <Label htmlFor="comida" className="text-xl cursor-pointer flex-1">
                🍕 Comida (siempre cae bien)
              </Label>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 cursor-pointer hover:border-purple-500 hover:bg-purple-50"
              onClick={() => toggleBringing('sorpresa')}
            >
              <Checkbox 
                id="sorpresa"
                checked={formData.bringing.includes('sorpresa')}
                onCheckedChange={() => toggleBringing('sorpresa')}
              />
              <Label htmlFor="sorpresa" className="text-xl cursor-pointer flex-1">
                🎁 Sorpresa (plot twist incoming)
              </Label>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 border-2 border-gray-300 rounded-xl p-4 cursor-pointer hover:border-red-500 hover:bg-red-50"
              onClick={() => toggleBringing('hambre')}
            >
              <Checkbox 
                id="hambre"
                checked={formData.bringing.includes('hambre')}
                onCheckedChange={() => toggleBringing('hambre')}
              />
              <Label htmlFor="hambre" className="text-xl cursor-pointer flex-1">
                🤤 Solo hambre (el caradura)
              </Label>
            </motion.div>
          </div>

          {formData.bringing.includes('hambre') && formData.bringing.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-100 rounded-xl"
            >
              <p className="text-red-700 text-center">
                😂 Sos un/a cara dura, pero te queremos igual
              </p>
            </motion.div>
          )}

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="mt-8 w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-xl py-6 rounded-xl disabled:opacity-50"
          >
            SIGUIENTE <ChevronRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Pregunta 7: Nivel de ganas de fiesta
  if (step === 7) {
    const level = formData.partyLevel[0];
    const getLevelText = () => {
      if (level <= 2) return "😴 Modo zombie";
      if (level <= 4) return "😐 Tibio/a";
      if (level <= 6) return "😊 Con onda";
      if (level <= 8) return "🔥 Vamo' a darle";
      return "🚀 DESCONTROL TOTAL";
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full"
        >
          <div className="mb-6">
            <span className="text-sm font-bold text-orange-600">PREGUNTA 7/8</span>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full" style={{ width: '87.5%' }}></div>
            </div>
          </div>

          <h2 className="text-4xl font-black mb-4 text-gray-800">
            Nivel de ganas de fiesta 🎊
          </h2>
          
          <p className="text-gray-600 mb-8">
            Del 1 al 10, ¿qué tan motivado/a venís?
          </p>

          <div className="space-y-6">
            <div className="text-center">
              <motion.div
                key={level}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                className="text-6xl font-black text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text mb-2"
              >
                {level}
              </motion.div>
              <p className="text-2xl font-bold text-gray-700">{getLevelText()}</p>
            </div>

            <Slider
              value={formData.partyLevel}
              onValueChange={(value) => updateField('partyLevel', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />

            <div className="flex justify-between text-sm text-gray-600">
              <span>1 - Muerto</span>
              <span>10 - Desatado</span>
            </div>
          </div>

          {level >= 9 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl text-center"
            >
              <p className="text-lg font-bold text-orange-700">
                🔥 Así se habla! Preparate para una noche épica
              </p>
            </motion.div>
          )}

          <Button
            onClick={nextStep}
            className="mt-8 w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-xl py-6 rounded-xl"
          >
            SIGUIENTE <ChevronRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Pregunta 8: Términos y condiciones
  if (step === 8) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full"
        >
          <div className="mb-6">
            <span className="text-sm font-bold text-purple-600">PREGUNTA 8/8</span>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <h2 className="text-4xl font-black mb-4 text-gray-800">
            Términos y Condiciones 📜
          </h2>
          
          <p className="text-gray-600 mb-8">
            Leé con atención (o no, total todos aceptamos sin leer).
          </p>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 space-y-4">
            <div className="flex items-start gap-3">
              <Music className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">
                Puede haber música <span className="font-bold">MUY FUERTE</span>. Si sos sensible, traé tapones.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">
                Puede haber <span className="font-bold">CAOS TOTAL</span>. Es parte de la experiencia.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">
                Habrá <span className="font-bold">DIVERSIÓN GARANTIZADA</span>. O al menos lo intentamos.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Beer className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">
                Podés quedarte a dormir si tomás de más. <span className="font-bold">Pero avisá antes.</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">
                <span className="font-bold">Fecha límite para confirmar: 19 de Febrero</span>. No seas ese que avisa el mismo día.
              </p>
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-start space-x-3 border-2 border-gray-300 rounded-xl p-4 cursor-pointer hover:border-purple-500 hover:bg-purple-50"
            onClick={() => updateField('acceptTerms', !formData.acceptTerms)}
          >
            <Checkbox 
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => updateField('acceptTerms', checked)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-lg cursor-pointer">
              Acepto todo lo anterior y prometo no ser un/a amargo/a en la fiesta 🎉
            </Label>
          </motion.div>

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl py-6 rounded-xl disabled:opacity-50"
          >
            CONFIRMAR ASISTENCIA ✅
          </Button>
        </motion.div>
      </div>
    );
  }

  // Pantalla final
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl w-full text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
        >
          <CheckCircle2 className="w-32 h-32 mx-auto mb-6 text-green-500" />
        </motion.div>

        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          {formData.attending === 'no' ? '😢 QUE BAJÓN' : '🎉 ¡CONFIRMADO!'}
        </h1>

        {formData.attending === 'no' ? (
          <div className="space-y-6">
            <p className="text-2xl text-gray-700">
              Bueno {formData.name}, que lástima que no vengas...
            </p>
            <div className="bg-orange-100 rounded-2xl p-6">
              <p className="text-lg text-gray-800 mb-2 font-bold">Tu excusa fue:</p>
              <p className="text-xl text-orange-700 italic">"{formData.noReason}"</p>
            </div>
            <p className="text-gray-600">
              Si cambiás de opinión, avisame antes del <span className="font-bold">19 de Febrero</span>.
            </p>
            <p className="text-2xl">
              Te vamos a extrañar 💔
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-2xl text-gray-700">
              ¡Genial {formData.name}! Ya estás en la lista 📝
            </p>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Tu vibe:</p>
                  <p className="text-xl font-bold text-gray-800">
                    {getVibeEmoji(formData.vibe)} {formData.vibe === 'tranqui' ? 'Tranqui' : formData.vibe === 'fiesta' ? 'Fiesta Total' : formData.vibe === 'emocional' ? 'Emocional' : 'NPC'}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Personas:</p>
                  <p className="text-xl font-bold text-gray-800">
                    👥 {formData.guestCount} {parseInt(formData.guestCount) === 1 ? 'persona' : 'personas'}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Vas a traer:</p>
                  <p className="text-lg font-bold text-gray-800">
                    {formData.bringing.map(item => getBringingEmoji(item)).join(' ')}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Nivel de fiesta:</p>
                  <p className="text-xl font-bold text-gray-800">
                    🔥 {formData.partyLevel[0]}/10
                  </p>
                </div>
              </div>

              {formData.companions && (
                <div className="bg-white rounded-xl p-4 shadow-sm text-left">
                  <p className="text-sm text-gray-600 mb-1">Venís con:</p>
                  <p className="text-lg text-gray-800">{formData.companions}</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
              <p className="text-lg font-bold text-gray-800 mb-3">📍 Info importante:</p>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-800"><span className="font-bold">21 de Febrero, 21hs</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-800"><span className="font-bold">Quincho - Obispo Oro 440</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-800">Confirmá antes del <span className="font-bold">19 de Febrero</span></span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xl font-bold text-gray-700">
                ¡Nos vemos ahí! 🚀
              </p>
              <p className="text-gray-600">
                Si tenés algún cambio, avisame antes de la fecha límite.
              </p>
            </div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🎂🎉🎊
            </motion.div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            ¿Querés cambiar algo? F5 y empezá de nuevo<br />
            (perdón, no implementé el botón de volver 😅)
          </p>
        </div>
      </motion.div>
    </div>
  );
}
