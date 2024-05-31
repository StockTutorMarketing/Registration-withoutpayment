import { Box, Heading, Text, Grid } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import Vimeo from "@vimeo/player";

export default function Review() {
  const videoRef = useRef(null);

  useEffect(() => {
    let player;
    if (videoRef.current) {
      player = new Vimeo(videoRef.current, {
        loop: true,
        autoplay: false,
        controls: false,
        background: true,
      });

      const handlePlayPause = ([entry]) => {
        if (entry.isIntersecting) {
          player.play().catch(error => {
            console.error('Error playing the video:', error);
          });
        } else {
          player.pause().catch(error => {
            console.error('Error pausing the video:', error);
          });
        }
      };

      const observer = new IntersectionObserver(handlePlayPause, {
        threshold: 0.5,
      });

      observer.observe(videoRef.current);

      return () => {
        observer.disconnect();
        player.unload();
      };
    }
  }, []);

  return (
    <Grid  background={"#00013A"} marginLeft="auto" marginRight="auto" >
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        backgroundSize="cover"
        backgroundPosition="center"
        alignItems="center"
        justifyContent="center"
      >
        <Box  fontFamily="roboto" color="white" py={8} px={6} textAlign="center">
          <Heading fontSize={{ base: 30, sm: 29, md: 36, lg: 40 }}>
            Voices of our{" "}
            <span
              style={{
                background: "linear-gradient(90deg, white,gray)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              5000+
            </span>{" "}
            Learners
          </Heading>
          <Text style={{color:"whitesmoke"}} ml={78} align={"left"} maxWidth={"70%"} mt={4} size={"24px"} color="gray">
            Excited to welcome you to our community of professional traders,
            where over{" "}
            <span
              style={{
                background: "linear-gradient(90deg, white,gray)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              5000 individuals
            </span>{" "}
            are already empowered by{" "}
            <span
              style={{
                background: "linear-gradient(90deg, white, gray)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Stock Tutor
            </span>
            . Get set to fuel your path to financial success with us!
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontFamily="roboto"
          color="white"
          py={8}
          px={6}
        >
          <div style={{ width: "100%", position: "relative", paddingBottom: "56.25%" }}>
            <iframe
              ref={videoRef}
              src="https://player.vimeo.com/video/952205364?badge=0&autopause=0&player_id=0&app_id=58479"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
              title="Testimonial Video"
            ></iframe>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}
