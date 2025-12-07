import React, { useState } from 'react';
import { 
  RotateCcw, Mail, Lock, User, AlertCircle, Eye, EyeOff, 
  Zap, ArrowRight, Loader2, Camera, Chrome
} from 'lucide-react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInAnonymously,
  updateProfile,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase'; 

const AuthScreen = ({ onLoginSuccess }) => {
  // --- ESTADOS ---
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  // --- HANDLERS ---

  // Manejo de selección de archivo (Foto)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Creamos una URL local para ver la foto inmediatamente
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  // Login con Google
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      console.error("Google Auth Error:", err);
      setError("Error al iniciar con Google. Verifica tu configuración en Firebase.");
      setLoading(false);
    }
  };

  // Login como Invitado (Demo)
  const handleGuestLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInAnonymously(auth);
      // Opcional: Darle un nombre temporal al invitado
      if (auth.currentUser) {
          await updateProfile(auth.currentUser, { 
              displayName: "Invitado",
              photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest"
          });
      }
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      console.error("Guest Auth Error:", err);
      setError("No se pudo iniciar el modo Demo. Intenta más tarde.");
      setLoading(false);
    }
  };

  // Auth Principal (Email/Pass)
  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // --- LOGIN ---
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // --- REGISTRO ---
        if (username.trim().length < 3) {
          throw new Error('El nombre de usuario debe tener al menos 4 caracteres.');
        }
        
        // Crear usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        //Definir foto de perfil
        const avatarUrl = photoPreview || `https://ui-avatars.com/api/?name=${username.replace(' ', '+')}&background=random&color=fff`;

        // Actualizar perfil
        await updateProfile(user, {
          displayName: username,
          photoURL: avatarUrl
        });
      }
      
      if (onLoginSuccess) onLoginSuccess();
      
    } catch (err) {
      console.error("Auth Error:", err);
      let msg = "Ocurrió un error inesperado.";
      // Traducción de errores comunes de Firebase
      if (err.message.includes("auth/invalid-email")) msg = "El correo no es válido.";
      if (err.message.includes("auth/user-not-found") || err.message.includes("auth/invalid-credential")) msg = "Correo o contraseña incorrectos.";
      if (err.message.includes("auth/wrong-password")) msg = "Contraseña incorrecta.";
      if (err.message.includes("auth/email-already-in-use")) msg = "Este correo ya está registrado.";
      if (err.message.includes("auth/weak-password")) msg = "La contraseña es muy débil (mínimo 6 caracteres).";
      if (err.code === "auth/popup-closed-by-user") msg = "Se cerró la ventana de inicio de sesión.";
      
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-gray-50">
      <div className="w-full max-w-md overflow-hidden duration-300 bg-white border border-gray-100 shadow-xl rounded-3xl animate-in zoom-in-95">
        
        {/* Header */}
        <div className="relative p-8 overflow-hidden text-center bg-indigo-600">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-white shadow-lg rounded-2xl rotate-3">
              <RotateCcw className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">SyncStudy</h1>
            <p className="mt-1 text-sm font-medium text-indigo-200">Tu espacio de productividad favorito.</p>
          </div>
        </div>

        <div className="p-8">
          <h2 className="mb-6 text-xl font-bold text-center text-gray-800">
            {isLogin ? '¡Hola de nuevo!' : 'Crear Cuenta'}
          </h2>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-6 text-sm text-red-600 border border-red-100 bg-red-50 rounded-xl animate-in slide-in-from-top-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            
            {/* --- CAMPOS DE REGISTRO --- */}
            {!isLogin && (
              <div className="space-y-4 animate-in slide-in-from-left-2">
                
                {/* Selección de foto de perfil */}
                <div className="flex justify-center mb-4">
                  <div className="relative cursor-pointer group">
                    <div className="flex items-center justify-center w-24 h-24 overflow-hidden transition-colors bg-gray-100 border-2 border-gray-300 border-dashed rounded-full hover:border-indigo-500">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="object-cover w-full h-full" />
                      ) : (
                        <Camera className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="mt-2 text-xs font-medium text-center text-gray-400">
                      {photoPreview ? 'Cambiar foto' : 'Subir foto'}
                    </div>
                  </div>
                </div>

                {/* Campo nombre */}
                <div className="space-y-1">
                  <label className="ml-1 text-xs font-bold text-gray-500 uppercase">Nombre</label>
                  <div className="relative">
                    <User className="absolute text-gray-400 left-3 top-3" size={20} />
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full py-3 pl-10 pr-4 transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* --- CAMPOS COMUNES --- */}
            <div className="space-y-1">
              <label className="ml-1 text-xs font-bold text-gray-500 uppercase">Email</label>
              <div className="relative">
                <Mail className="absolute text-gray-400 left-3 top-3" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full py-3 pl-10 pr-4 transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="ml-1 text-xs font-bold text-gray-500 uppercase">Contraseña</label>
              <div className="relative">
                <Lock className="absolute text-gray-400 left-3 top-3" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-3 pl-10 pr-12 transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 right-3 top-3 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  {isLogin ? 'Iniciar Sesión' : 'Registrarse'} 
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* --- BOTONES EXTRA --- */}
          <div className="mt-6 space-y-3">
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-400">O continúa con</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full gap-2 py-3 font-bold text-gray-700 transition-all bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300"
            >
              <Chrome size={18} className="text-red-500" /> {/* Simulamos icono de Google */}
              Google
            </button>

            <button 
              type="button"
              onClick={handleGuestLogin}
              className="flex items-center justify-center w-full gap-2 py-3 font-bold text-gray-500 transition-all bg-white border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
            >
              <Zap size={18} />
              Modo Invitado (Demo)
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); setPhotoPreview(null); }}
                className="font-bold text-indigo-600 transition-colors hover:text-indigo-800"
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthScreen;