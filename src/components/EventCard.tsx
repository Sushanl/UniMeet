import { motion } from 'motion/react';
import { Clock, MapPin, Users } from 'lucide-react';
import { Card, Flex, Text, Badge } from '@radix-ui/themes';

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
  onClick?: () => void;
}

export function EventCard({
  id,
  title,
  imageUrl,
  date,
  time,
  location,
  attendees,
  tags,
  onClick
}: EventCardProps) {
  return (
    <Card asChild className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <motion.div layoutId={`event-${id}`} onClick={onClick}>
        <motion.div
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.00 }}
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
        </motion.div>
      </motion.div>
    </Card>
  );
}
