import { Clock, MapPin, Users } from 'lucide-react';
import { Card, Flex, Text, Badge } from '@radix-ui/themes';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export type EventType = 'social' | 'study' | 'sports' | 'club' | 'entertainment';

export interface EventCardProps {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  time: string;
  location: string;
  latitude: number;
  longitude: number;
  attendees: number;
  tags: string[];
  eventType: EventType;
  isHighlighted?: boolean;
}

export const EventCard = forwardRef<HTMLDivElement, EventCardProps>(({
  title,
  imageUrl,
  date,
  time,
  location,
  attendees,
  tags,
  isHighlighted = false
}, ref) => {
  return (
    <motion.div
      ref={ref}
      animate={isHighlighted ? {
        boxShadow: [
          '0 1px 3px 0 rgb(0 0 0 / 0.1)',
          '0 10px 15px -3px rgb(125 211 252 / 0.3), 0 4px 6px -4px rgb(125 211 252 / 0.3)',
          '0 10px 15px -3px rgb(125 211 252 / 0.3), 0 4px 6px -4px rgb(125 211 252 / 0.3)',
          '0 1px 3px 0 rgb(0 0 0 / 0.1)'
        ]
      } : {}}
      transition={{
        duration: 0.5,
        ease: 'easeInOut'
      }}
    >
      <Card
        className={`overflow-hidden transition-shadow cursor-pointer ${isHighlighted
          ? 'ring-2 ring-sky-200'
          : 'hover:shadow-md'
          }`}
      >
        <div className="aspect-video w-full overflow-hidden bg-gray-200">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <Text size="4" weight="bold" className="block mb-3">
            {title}
          </Text>

          <Flex direction="column" gap="2" className="mb-3">
            <Flex align="center" gap="2">
              <Clock size={16} className="text-gray-500" />
              <Text size="2" className="text-gray-600">
                {date} at {time}
              </Text>
            </Flex>

            <Flex align="center" gap="2">
              <MapPin size={16} className="text-gray-500" />
              <Text size="2" className="text-gray-600">
                {location}
              </Text>
            </Flex>

            <Flex align="center" gap="2">
              <Users size={16} className="text-gray-500" />
              <Text size="2" className="text-gray-600">
                {attendees} attending
              </Text>
            </Flex>
          </Flex>

          <Flex gap="2" wrap="wrap">
            {tags.map((tag) => (
              <Badge key={tag} variant="soft" size="1">
                {tag}
              </Badge>
            ))}
          </Flex>
        </div>
      </Card>
    </motion.div>
  );
});

EventCard.displayName = 'EventCard';
