import { Award, Clock, CreditCard, Mail, MapPin, Phone } from "lucide-react";

interface ContentProps {
  dict: {
    title: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    servicesTitle: string;
    servicesList: string[];
    infoTitle: string;
    infoList: { text: string; icon: string }[];
    copyright: string;
  };
}

const Content: React.FC<ContentProps> = ({ dict }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Clock":
        return <Clock className="h-5 w-5 mr-2 text-main-600" />;
      case "CreditCard":
        return <CreditCard className="h-5 w-5 mr-2 text-main-600" />;
      case "Award":
        return <Award className="h-5 w-5 mr-2 text-main-600" />;
      default:
        return null;
    }
  };

  return (
    <footer className="w-full h-full bg-gradient-to-br from-main-100 to-main-300 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl flex flex-col justify-between h-full py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-56">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">{dict.title}</h3>
            <p className="text-gray-600">{dict.description}</p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-main-600" />
                {dict.address}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2 text-main-600" />
                {dict.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2 text-main-600" />
                {dict.email}
              </div>
            </div>
          </div>
          <div className="space-y-4 hidden md:block">
            <h4 className="text-lg font-semibold text-gray-900">
              {dict.servicesTitle}
            </h4>
            <ul className="space-y-2 text-gray-600">
              {dict.servicesList.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              {dict.infoTitle}
            </h4>
            <ul className="space-y-2 text-gray-600">
              {dict.infoList.map((item, index) => (
                <li key={index} className="flex items-center">
                  {getIcon(item.icon)}
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-600">{dict.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Content;
