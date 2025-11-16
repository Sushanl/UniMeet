import { Bell, User } from 'lucide-react';
import { Flex, Text, IconButton } from '@radix-ui/themes';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <Flex align="center" justify="between" className="px-6 py-4">
        <Flex align="center" gap="8">
          <Text size="6" weight="bold" className="text-purple-600">
            UniMeet
          </Text>

          <nav>
            <Flex gap="6" className="ml-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Events
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Attending
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Hosting
              </a>
            </Flex>
          </nav>
        </Flex>

        <Flex align="center" gap="3">
          <IconButton variant="ghost" size="2">
            <Bell size={20} />
          </IconButton>
          <IconButton variant="ghost" size="2">
            <User size={20} />
          </IconButton>
        </Flex>
      </Flex>
    </header>
  );
}
