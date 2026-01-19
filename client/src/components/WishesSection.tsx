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

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-primary/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-accent w-6 h-6" />
              <h3 className="text-3xl font-display text-gray-800">Make a Wish</h3>
            </div>
            
            <p className="text-muted-foreground mb-8">
              Leave a sweet note, a promise, or a wish for our future together. Let's fill this space with love.
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">From</label>
                <input
                  {...form.register("name")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-200"
                  placeholder="Your Name"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">Your Message</label>
                <textarea
                  {...form.register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-200 resize-none"
                  placeholder="Write something sweet..."
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-sm">{form.formState.errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-pink-600 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  "Sending Love..."
                ) : (
                  <>
                    Send Wish <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Wishes Grid Side */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h3 className="text-4xl font-display text-primary mb-2">Love Notes</h3>
              <p className="text-muted-foreground">Little reminders of our love.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                // Skeleton loading state
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse h-40" />
                ))
              ) : wishes?.length === 0 ? (
                <div className="col-span-full py-12 text-center text-muted-foreground bg-white/50 rounded-2xl border border-dashed border-gray-200">
                  <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No wishes yet. Be the first to write one! 💕</p>
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
        </div>
      </div>
    </section>
  );
}
