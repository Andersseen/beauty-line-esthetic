import { Award, Clock, CreditCard, Mail, MapPin, Phone } from "lucide-react";

export default function Content() {
  return (
    <footer className="w-full h-full bg-gradient-to-br from-main-100 to-main-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl flex flex-col justify-between h-full py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-56">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              Centro de Estética
            </h3>
            <p className="text-gray-600">
              Realzando tu belleza natural desde 2005
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-main-600" />
                123 Calle Belleza, Ciudad
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2 text-main-600" />
                +34 123 456 789
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2 text-main-600" />
                info@centroestetica.com
              </div>
            </div>
          </div>
          <div className="space-y-4 hidden md:block">
            <h4 className="text-lg font-semibold text-gray-900">
              Nuestros Servicios
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>Tratamientos Faciales</li>
              <li>Depilación Láser</li>
              <li>Masajes Relajantes</li>
              <li>Tratamientos Corporales</li>
              <li>Manicura y Pedicura</li>
              <li>Maquillaje Profesional</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Información Útil
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-main-600" />
                Lunes a Sábado: 9:00 - 20:00
              </li>
              <li className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-main-600" />
                Aceptamos todas las tarjetas
              </li>
              <li className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-main-600" />
                Personal certificado
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-600">
            © 2024 Centro de Estética. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
