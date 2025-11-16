import { Coffee, BookOpen, Dumbbell, Users, Music, Calendar, Utensils, Film } from 'lucide-react';

const icons = [Coffee, BookOpen, Dumbbell, Users, Music, Calendar, Utensils, Film];

export function AnimatedEventIcons() {
  const radius = 140;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-80 h-80">
        {icons.map((Icon, index) => {
          const angle = (index * 360) / icons.length;
          const rotate = -angle;

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                animation: 'rotate 20s linear infinite',
              }}
            >
              <div
                style={{
                  transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(${rotate}deg)`,
                }}
              >
                <div className="bg-white/15 backdrop-blur-sm rounded-full p-4">
                  <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
