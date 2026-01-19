import { useWishes, useCreateWish } from "@/hooks/use-wishes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWishSchema, type InsertWish } from "@shared/schema";
import { motion } from "framer-motion";
import { Heart, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WishesSection() {
  const { data: wishes, isLoading } = useWishes();
  const { mutateAsync: createWish, isPending } = useCreateWish();
  const { toast } = useToast();

  const form = useForm<InsertWish>({
    resolver: zodResolver(insertWishSchema),
    defaultValues: {
      name: "Your Wifey",
      message: "",
    },
  });

  const onSubmit = async (data: InsertWish) => {
    try {
      await createWish(data);
      form.reset({ name: "Your Wifey", message: "" });
      toast({
        title: "Wish Sent! 💖",
        description: "Your love note has been added to the wall.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send your wish. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-24 px-4 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-display text-primary mb-2">Love Notes</h3>
          <p className="text-muted-foreground text-lg">Little reminders of our love and special wishes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse h-40" />
            ))
          ) : wishes?.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-white/50 rounded-2xl border border-dashed border-gray-200">
              <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No messages yet. 💕</p>
            </div>
          ) : (
            wishes?.map((wish, idx) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100/50 hover:shadow-md transition-shadow relative group"
              >
                <Heart className="w-4 h-4 text-pink-300 absolute top-4 right-4 group-hover:text-primary transition-colors duration-300" />
                <p className="text-gray-700 font-display italic text-lg mb-4">"{wish.message}"</p>
                <div className="flex justify-end">
                  <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-full uppercase tracking-wider">
                    - {wish.name}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
