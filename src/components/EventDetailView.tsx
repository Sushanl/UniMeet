import { motion } from 'motion/react';
import { ArrowLeft, Clock, MapPin, Users, Calendar } from 'lucide-react';
import { Card, Flex, Text, Badge, Button } from '@radix-ui/themes';
import type { EventCardProps } from './EventCard';

interface EventDetailViewProps {
  event: EventCardProps;
  onBack: () => void;
}

export function EventDetailView({ event, onBack }: EventDetailViewProps) {
  return (
    <div className="h-full p-4 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft size={20} />
          Back to events
        </Button>
      </motion.div>

      <Card asChild className="overflow-hidden flex-1">
        <motion.div
          layoutId={`event-${event.id}`}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="aspect-video w-full overflow-hidden bg-gray-200">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              <Text size="7" weight="bold" className="block mb-6">
                {event.title}
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.45 }}
            >
              <Flex direction="column" gap="4" className="mb-6">
                <Flex align="center" gap="3">
                  <Calendar size={20} className="text-gray-500" />
                  <Text size="3" className="text-gray-700">
                    {event.date}
                  </Text>
                </Flex>

                <Flex align="center" gap="3">
                  <Clock size={20} className="text-gray-500" />
                  <Text size="3" className="text-gray-700">
                    {event.time}
                  </Text>
                </Flex>

                <Flex align="center" gap="3">
                  <MapPin size={20} className="text-gray-500" />
                  <Text size="3" className="text-gray-700">
                    {event.location}
                  </Text>
                </Flex>

                <Flex align="center" gap="3">
                  <Users size={20} className="text-gray-500" />
                  <Text size="3" className="text-gray-700">
                    {event.attendees} people attending
                  </Text>
                </Flex>
              </Flex>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.55 }}
            >
              <div className="mb-6">
                <Text size="3" weight="medium" className="block mb-3 text-gray-900">
                  Tags
                </Text>
                <Flex gap="2" wrap="wrap">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="soft" size="2">
                      {tag}
                    </Badge>
                  ))}
                </Flex>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.65 }}
            >
              <div>
                <Text size="3" weight="medium" className="block mb-3 text-gray-900">
                  About this event
                </Text>
                <Text size="3" className="text-gray-600 leading-relaxed">
                  Join us for an exciting event! This is a placeholder description.
                  In a real application, this would contain detailed information about
                  the event, what to expect, who is hosting it, and any other relevant
                  details that attendees should know.
                </Text>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
}
