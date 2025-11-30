"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppState } from "@/store/useAppState";
import { Coins, Star, Lock, Check, Sparkles, Palette, Crown, Zap } from "lucide-react";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  category: "avatar" | "theme" | "powerup" | "badge";
  price: number;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const SHOP_ITEMS: ShopItem[] = [
  // Avatars
  { id: "avatar-robot", name: "Robot Friend", description: "A friendly robot companion", category: "avatar", price: 100, icon: "🤖", rarity: "common" },
  { id: "avatar-unicorn", name: "Magic Unicorn", description: "Sparkly and magical!", category: "avatar", price: 200, icon: "🦄", rarity: "rare" },
  { id: "avatar-astronaut", name: "Space Explorer", description: "Ready for space adventures", category: "avatar", price: 300, icon: "👨‍🚀", rarity: "rare" },
  { id: "avatar-dragon", name: "Math Dragon", description: "Breathes number fire!", category: "avatar", price: 500, icon: "🐉", rarity: "epic" },
  { id: "avatar-wizard", name: "Science Wizard", description: "Master of experiments", category: "avatar", price: 750, icon: "🧙", rarity: "epic" },
  { id: "avatar-phoenix", name: "Golden Phoenix", description: "Rise from the ashes of wrong answers!", category: "avatar", price: 1000, icon: "🦅", rarity: "legendary" },

  // Themes
  { id: "theme-ocean", name: "Ocean Theme", description: "Deep blue sea vibes", category: "theme", price: 150, icon: "🌊", rarity: "common" },
  { id: "theme-space", name: "Galaxy Theme", description: "Stars and nebulas", category: "theme", price: 250, icon: "🌌", rarity: "rare" },
  { id: "theme-jungle", name: "Jungle Theme", description: "Wild and green!", category: "theme", price: 250, icon: "🌴", rarity: "rare" },
  { id: "theme-candy", name: "Candy Land", description: "Sweet and colorful", category: "theme", price: 400, icon: "🍭", rarity: "epic" },
  { id: "theme-rainbow", name: "Rainbow Theme", description: "All the colors!", category: "theme", price: 600, icon: "🌈", rarity: "legendary" },

  // Power-ups
  { id: "powerup-hint", name: "Hint Pack (5)", description: "Get 5 extra hints", category: "powerup", price: 50, icon: "💡", rarity: "common" },
  { id: "powerup-double", name: "Double XP (1hr)", description: "Earn 2x XP for one hour", category: "powerup", price: 100, icon: "⚡", rarity: "common" },
  { id: "powerup-freeze", name: "Streak Freeze", description: "Protects your streak for one day", category: "powerup", price: 150, icon: "🧊", rarity: "rare" },
  { id: "powerup-skip", name: "Skip Ticket", description: "Skip one hard question", category: "powerup", price: 75, icon: "⏭️", rarity: "common" },

  // Badges
  { id: "badge-star", name: "Superstar Badge", description: "Show off your skills!", category: "badge", price: 300, icon: "⭐", rarity: "rare" },
  { id: "badge-genius", name: "Genius Badge", description: "For true math masters", category: "badge", price: 500, icon: "🧠", rarity: "epic" },
  { id: "badge-champion", name: "Champion Badge", description: "The ultimate achievement", category: "badge", price: 1000, icon: "🏆", rarity: "legendary" },
];

const RARITY_COLORS = {
  common: "bg-gray-100 text-gray-700 border-gray-300",
  rare: "bg-blue-100 text-blue-700 border-blue-300",
  epic: "bg-purple-100 text-purple-700 border-purple-300",
  legendary: "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-orange-300",
};

const CATEGORY_ICONS = {
  avatar: Sparkles,
  theme: Palette,
  powerup: Zap,
  badge: Crown,
};

export default function ShopPage() {
  const { user, purchaseItem, ownedItems } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState<"all" | ShopItem["category"]>("all");
  const [purchaseAnimation, setPurchaseAnimation] = useState<string | null>(null);

  const userCoins = user?.coins || 500; // Fallback for demo

  const filteredItems = selectedCategory === "all" 
    ? SHOP_ITEMS 
    : SHOP_ITEMS.filter((item) => item.category === selectedCategory);

  const handlePurchase = (item: ShopItem) => {
    if (userCoins >= item.price && !ownedItems.includes(item.id)) {
      purchaseItem(item.id, item.price);
      setPurchaseAnimation(item.id);
      setTimeout(() => setPurchaseAnimation(null), 1000);
    }
  };

  const isOwned = (itemId: string) => ownedItems.includes(itemId);
  const canAfford = (price: number) => userCoins >= price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-purple/10 to-sky-blue/10 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-white border-b border-cloud-gray sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-deep-space">Shop</h1>
              <p className="text-sm text-deep-space/60">Spend your hard-earned coins!</p>
            </div>
            <div className="flex items-center gap-2 bg-sunny-yellow/20 px-4 py-2 rounded-full">
              <Coins className="w-5 h-5 text-sunny-yellow-dark" />
              <span className="font-bold text-sunny-yellow-dark">{userCoins}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4">
          {[
            { key: "all", label: "All Items", icon: Star },
            { key: "avatar", label: "Avatars", icon: Sparkles },
            { key: "theme", label: "Themes", icon: Palette },
            { key: "powerup", label: "Power-ups", icon: Zap },
            { key: "badge", label: "Badges", icon: Crown },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as typeof selectedCategory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === key
                  ? "bg-cosmic-purple text-white"
                  : "bg-white text-deep-space hover:bg-cosmic-purple/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const owned = isOwned(item.id);
              const affordable = canAfford(item.price);
              const CategoryIcon = CATEGORY_ICONS[item.category];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    padding="md"
                    className={`relative ${
                      owned ? "opacity-75" : ""
                    } ${purchaseAnimation === item.id ? "ring-4 ring-vibrant-green" : ""}`}
                  >
                    {/* Rarity Badge */}
                    <div className="absolute top-2 right-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border capitalize ${RARITY_COLORS[item.rarity]}`}
                      >
                        {item.rarity}
                      </span>
                    </div>

                    {/* Category Icon */}
                    <div className="absolute top-2 left-2">
                      <CategoryIcon className="w-4 h-4 text-deep-space/30" />
                    </div>

                    {/* Item Icon */}
                    <motion.div
                      className="text-5xl text-center my-4"
                      animate={
                        purchaseAnimation === item.id
                          ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }
                          : {}
                      }
                    >
                      {item.icon}
                    </motion.div>

                    {/* Item Info */}
                    <h3 className="font-bold text-deep-space text-center mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-deep-space/60 text-center mb-3">
                      {item.description}
                    </p>

                    {/* Price/Buy Button */}
                    {owned ? (
                      <div className="flex items-center justify-center gap-2 text-vibrant-green">
                        <Check className="w-4 h-4" />
                        <span className="font-medium">Owned</span>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={!affordable}
                        className={`w-full ${
                          affordable
                            ? "bg-cosmic-purple hover:bg-cosmic-purple-dark"
                            : "bg-gray-200 text-gray-500"
                        }`}
                        size="sm"
                      >
                        {affordable ? (
                          <span className="flex items-center gap-2">
                            <Coins className="w-4 h-4" />
                            {item.price}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            {item.price}
                          </span>
                        )}
                      </Button>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-deep-space/60">No items in this category yet!</p>
          </div>
        )}
      </div>
    </div>
  );
}

