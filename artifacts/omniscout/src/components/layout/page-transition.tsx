import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Switch, Route, useLocation } from "wouter";
import Home from "@/pages/home";
import Compare from "@/pages/compare";
import Features from "@/pages/features";
import UseCases from "@/pages/use-cases";
import Blogs from "@/pages/blogs";
import BlogPost from "@/pages/blog-post";
import Changelog from "@/pages/changelog";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

const pageEase = [0.25, 0.1, 0.25, 1] as const;

export function PageTransition() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.32, ease: pageEase }}
        className="overflow-x-clip"
      >
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/compare" component={Compare} />
          <Route path="/features" component={Features} />
          <Route path="/use-cases" component={UseCases} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/blogs/:slug" component={BlogPost} />
          <Route path="/changelog" component={Changelog} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}
