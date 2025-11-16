import { motion } from 'motion/react';
import { ArrowLeft, Clock, MapPin, Users, Calendar, Check } from 'lucide-react';
import { Card, Flex, Text, Badge, Button } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/useAuth';
import type { EventCardProps } from './EventCard';

interface EventDetailViewProps {
  event: EventCardProps;
  onBack?: () => void;
  onAttendeeChange?: () => void;
  disableAnimation?: boolean;
  initialAttendanceStatus?: boolean;
}

export function EventDetailView({ event, onBack, onAttendeeChange, disableAnimation = false, initialAttendanceStatus }: EventDetailViewProps) {
  const { user } = useAuth();
  const [isAttending, setIsAttending] = useState(initialAttendanceStatus ?? false);
  const [isLoading, setIsLoading] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(event.attendees);

  // Check if user is already attending
  useEffect(() => {
    const checkAttendance = async () => {
      if (!user) {
        setIsAttending(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('Attendees')
          .select('*')
          .eq('event_id', parseInt(event.id))
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          console.error('Error checking attendance:', error);
        } else {
          setIsAttending(!!data);
        }
      } catch (error) {
        console.error('Error checking attendance:', error);
      }
    };

    checkAttendance();
  }, [user, event.id]);

  // Fetch current attendee count
  useEffect(() => {
    const fetchAttendeeCount = async () => {
      try {
        const { count } = await supabase
          .from('Attendees')
          .select('*', { count: 'exact', head: true })
          .eq('event_id', parseInt(event.id));

        if (count !== null) {
          setAttendeeCount(count);
        }
      } catch (error) {
        console.error('Error fetching attendee count:', error);
      }
    };

    fetchAttendeeCount();
  }, [event.id, isAttending]);

  const handleAttend = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!user) {
      alert('Please sign in to attend events');
      return;
    }

    setIsLoading(true);
    try {
      if (isAttending) {
        // Remove attendance
        const { error } = await supabase
          .from('Attendees')
          .delete()
          .eq('event_id', parseInt(event.id))
          .eq('user_id', user.id);

        if (error) {
          console.error('Error removing attendance:', error);
          alert('Failed to leave event');
        } else {
          setIsAttending(false);
          setAttendeeCount(prev => Math.max(0, prev - 1));
          // Update parent after state is set
          requestAnimationFrame(() => {
            onAttendeeChange?.();
          });
        }
      } else {
        // Add attendance
        const { error } = await supabase
          .from('Attendees')
          .insert([
            {
              event_id: parseInt(event.id),
              user_id: user.id
            }
          ]);

        if (error) {
          console.error('Error adding attendance:', error);
          if (error.code === '23505') { // Unique constraint violation
            alert('You are already attending this event');
          } else {
            alert('Failed to attend event');
          }
        } else {
          setIsAttending(true);
          setAttendeeCount(prev => prev + 1);
          // Update parent after state is set
          requestAnimationFrame(() => {
            onAttendeeChange?.();
          });
        }
      }
    } catch (error) {
      console.error('Error toggling attendance:', error);
      alert('Failed to update attendance');
    } finally {
      setIsLoading(false);
    }
  };

  const CardWrapper = disableAnimation ? 'div' : motion.div;
  const ContentWrapper = disableAnimation ? 'div' : motion.div;

  return (
    <div className="h-full flex flex-col">
      {onBack && (
        <div className="p-4 pb-0">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft size={20} />
            Back to events
          </Button>
        </div>
      )}

      <Card asChild className="overflow-hidden flex-1">
        <CardWrapper
          {...(!disableAnimation && {
            layoutId: `event-${event.id}`,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
          })}
        >
          <ContentWrapper
            {...(!disableAnimation && {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.1 }
            })}
          >
            <div className="aspect-video w-full overflow-hidden bg-gray-200">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <Text size="7" weight="bold" className="block mb-6">
                {event.title}
              </Text>

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
                    {attendeeCount} people attending
                  </Text>
                </Flex>
              </Flex>

              <div className="mb-6">
                {user ? (
                  <Button
                    size="3"
                    variant={isAttending ? "soft" : "solid"}
                    color={isAttending ? "green" : "blue"}
                    onClick={(e) => handleAttend(e)}
                    disabled={isLoading}
                    type="button"
                    style={{ width: '100%' }}
                  >
                    {isAttending ? (
                      <>
                        <Check size={16} />
                        Attending
                      </>
                    ) : (
                      'Attend Event'
                    )}
                  </Button>
                ) : (
                  <Button
                    size="3"
                    variant="soft"
                    color="gray"
                    disabled
                    style={{ width: '100%' }}
                  >
                    Sign in to attend
                  </Button>
                )}
              </div>

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
            </div>
          </ContentWrapper>
        </CardWrapper>
      </Card>
    </div>
  );
}
