"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function CareerRecommender() {
  const [step, setStep] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [educationLevel, setEducationLevel] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [workEnvironment, setWorkEnvironment] = useState("office");
  const [skills, setSkills] = useState("");
  const [careerInterests, setCareerInterests] = useState("");
  const [workValues, setWorkValues] = useState("");
  useEffect(() => {
    setFadeIn(true);
  }, []);
  const router = useRouter();
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getRecommendations = () => {
    const queryParams = new URLSearchParams({
      education: educationLevel,
      field: fieldOfStudy,
      environment: workEnvironment,
      skills: skills,
      interests: careerInterests,
      values: workValues,
    });

    console.log(queryParams);

    const url = `/recommendations?${queryParams.toString()}`;
    router.push(url);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <motion.header
        className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-yellow-400 mr-2" />
            <span className="text-2xl font-bold text-white">CareerCompass</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white bg-opacity-10 backdrop-blur-md"
          >
            <ul className="py-2 px-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="block text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </motion.header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate={fadeIn ? "visible" : "hidden"}
          variants={fadeInVariants}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto bg-white bg-opacity-10 backdrop-blur-md border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-yellow-400">
                Find Your Ideal Career Path
              </CardTitle>
              <CardDescription className="text-gray-300 text-sm sm:text-base">
                Answer a few questions to get personalized career
                recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="education"
                          className="text-white text-sm sm:text-base"
                        >
                          Highest Level of Education
                        </Label>
                        <Select
                          onValueChange={setEducationLevel}
                          value={educationLevel}
                        >
                          <SelectTrigger
                            id="education"
                            className="bg-white bg-opacity-20 border-white border-opacity-30 text-white mt-1"
                          >
                            <SelectValue placeholder="Select your education level" />
                          </SelectTrigger>
                          <SelectContent className="bg-indigo-900 border-white border-opacity-30 text-white">
                            <SelectItem value="high-school">
                              High School
                            </SelectItem>
                            <SelectItem value="bachelors">
                              Bachelor&apos;s Degree
                            </SelectItem>
                            <SelectItem value="masters">
                              Master&apos;s Degree
                            </SelectItem>
                            <SelectItem value="phd">Ph.D.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label
                          htmlFor="field"
                          className="text-white text-sm sm:text-base"
                        >
                          Field of Study
                        </Label>
                        <Input
                          id="field"
                          placeholder="e.g., Computer Science, Business, etc."
                          className="bg-white bg-opacity-20 border-white border-opacity-30 text-white placeholder:text-white mt-1"
                          value={fieldOfStudy}
                          onChange={(e) => setFieldOfStudy(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white text-sm sm:text-base">
                          Preferred Work Environment
                        </Label>
                        <RadioGroup
                          value={workEnvironment}
                          onValueChange={setWorkEnvironment}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="office"
                              id="office"
                              className="border-yellow-400 text-yellow-400"
                            />
                            <Label
                              htmlFor="office"
                              className="text-white text-sm sm:text-base"
                            >
                              Office
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <RadioGroupItem
                              value="remote"
                              id="remote"
                              className="border-yellow-400 text-yellow-400"
                            />
                            <Label
                              htmlFor="remote"
                              className="text-white text-sm sm:text-base"
                            >
                              Remote
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <RadioGroupItem
                              value="hybrid"
                              id="hybrid"
                              className="border-yellow-400 text-yellow-400"
                            />
                            <Label
                              htmlFor="hybrid"
                              className="text-white text-sm sm:text-base"
                            >
                              Hybrid
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label
                          htmlFor="skills"
                          className="text-white text-sm sm:text-base"
                        >
                          Top Skills
                        </Label>
                        <Input
                          id="skills"
                          placeholder="e.g., Programming, Communication, Leadership"
                          className="bg-white bg-opacity-20 border-white border-opacity-30 text-white placeholder:text-white mt-1"
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="interests"
                          className="text-white text-sm sm:text-base"
                        >
                          Career Interests
                        </Label>
                        <Input
                          id="interests"
                          placeholder="e.g., Technology, Healthcare, Finance"
                          className="bg-white bg-opacity-20 border-white border-opacity-30 text-white placeholder:text-white mt-1"
                          value={careerInterests}
                          onChange={(e) => setCareerInterests(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="values"
                          className="text-white text-sm sm:text-base"
                        >
                          Work Values
                        </Label>
                        <Input
                          id="values"
                          placeholder="e.g., Work-life balance, Innovation, Social impact"
                          className="bg-white bg-opacity-20 border-white border-opacity-30 text-white placeholder:text-white mt-1"
                          value={workValues}
                          onChange={(e) => setWorkValues(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  className="w-full sm:w-auto bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-200"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button
                  onClick={handleNextStep}
                  className="w-full sm:w-auto bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-all duration-200"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={getRecommendations}
                  className="w-full sm:w-auto bg-green-500 text-white hover:bg-green-400 transition-all duration-200"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Get Recommendations
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      <motion.footer
        className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg mt-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-300 text-sm sm:text-base">
          <p>&copy; 2024 CareerCompass. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}
