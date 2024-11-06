"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react"; // Import Suspense
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/lib/utils";

interface Recommendation {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  descriptionText: string;
  formattedLocation: string;
  link: string;
}

function SkeletonCard() {
  return (
    <Card className="bg-white bg-opacity-20">
      <CardContent className="p-4">
        <Skeleton className="aspect-video bg-gray-700 rounded-lg mb-4 h-24 w-full" />
        <Skeleton className="h-6 w-3/4 bg-gray-700 mb-2" />
        <Skeleton className="h-4 w-full bg-gray-700" />
        <Skeleton className="h-4 w-5/6 bg-gray-700 mt-1" />
      </CardContent>
    </Card>
  );
}

const Recommendations = React.memo(() => {
  const [fadeIn, setFadeIn] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const fetchRecommendationsFromAPI = async () => {
    try {
      const education = searchParams.get("education");
      const field = searchParams.get("field");
      const environment = searchParams.get("environment");
      const skills = searchParams.get("skills");
      const interests = searchParams.get("interests");
      const values = searchParams.get("values");

      const response = await axios.post(`${BASE_URL}/recommend-collab`, {
        highest_degree: education,
        field_of_study: field,
        work_env: environment,
        skills: skills,
        career_interests: interests,
        work_values: values,
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch recommendations");
      }

      return response.data.recommendations;
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch recommendations. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  useEffect(() => {
    setFadeIn(true);

    // Memoize the recommendations to avoid unnecessary re-fetching
    const cachedRecommendations = sessionStorage.getItem("recommendations");

    if (cachedRecommendations) {
      setRecommendations(JSON.parse(cachedRecommendations));
      setIsLoading(false);
    } else {
      const fetchRecommendations = async () => {
        const fetchedData = await fetchRecommendationsFromAPI();
        setRecommendations(fetchedData);
        sessionStorage.setItem("recommendations", JSON.stringify(fetchedData));
        setIsLoading(false);
      };
      fetchRecommendations();
    }
  }, [searchParams, toast]);

  const fadeInVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }),
    []
  );

  return (
    <motion.div
      initial="hidden"
      animate={fadeIn ? "visible" : "hidden"}
      variants={fadeInVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white"
    >
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-6xl mx-auto bg-white bg-opacity-10 backdrop-blur-md border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl text-yellow-400">
              Your Career Recommendations
            </CardTitle>
            <CardDescription className="text-gray-300 text-sm sm:text-base">
              {isLoading
                ? "Loading..."
                : recommendations.length > 0
                ? "Click on a job card to view more details."
                : "Could not find any recommendations. Please try again."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array(6)
                    .fill(0)
                    .map((_, index) => <SkeletonCard key={index} />)
                : recommendations.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <Card className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 cursor-pointer">
                            <CardContent className="p-4">
                              <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                <Avatar className="h-24 w-24">
                                  <AvatarImage
                                    src={job.companyLogo}
                                    alt={`${job.companyName} logo`}
                                  />
                                  <AvatarFallback>
                                    {job.companyName.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2">
                                {job.title}
                              </h3>
                              <p className="text-sm text-gray-300 line-clamp-2">
                                {job.descriptionText}
                              </p>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl text-yellow-400">
                              {job.title}
                            </DialogTitle>
                            <DialogDescription className="text-gray-300">
                              {job.companyName}
                            </DialogDescription>
                          </DialogHeader>
                          <ScrollArea className="mt-4 max-h-[60vh]">
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage
                                    src={job.companyLogo}
                                    alt={`${job.companyName} logo`}
                                  />
                                  <AvatarFallback>
                                    {job.companyName.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold">
                                    {job.companyName}
                                  </h4>
                                  <p className="text-sm text-gray-400 flex items-center">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {job.formattedLocation}
                                  </p>
                                </div>
                              </div>
                              <p className="text-gray-300">
                                {job.descriptionText}
                              </p>
                              <Link
                                href={job.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                              >
                                View Full Job Details
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </motion.div>
                  ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-200"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Questionnaire
            </Button>
          </CardFooter>
        </Card>
      </main>
    </motion.div>
  );
});

// Wrapper Component with Suspense
export default function Collab() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Recommendations />
    </Suspense>
  );
}
