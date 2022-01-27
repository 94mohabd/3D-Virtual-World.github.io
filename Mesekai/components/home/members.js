import React from "react";
import Image from "next/image";
import { Carousel } from "antd";

const bios = [
  {
    key: "caelen",
    memberName: "Caelan Wang",
    memberRole: "Team Lead",
    memberBio:
      "I'm a graduate student studying computer science at San Francisco State University " +
      "interested in developing computer graphics, games, and VR/AR applications. " +
      "Before coming to the Bay Area, I lived in Beijing, Washington D.C., and Seattle. " +
      "I rock climbed competitively throughout high school and college until the pandemic " +
      "shut down all the gyms, so I look forward to getting back onto the walls. I recently " +
      "picked up snowboarding and can't wait to check out the Cali ski resorts this winter.",
  },
  {
    key: "vasu",
    memberName: "Vasudevan Venugopal",
    memberRole: "Frontend Lead",
    memberBio:
      " I am an undergraduate student studying Computer Science at San Francisco State University. " +
      "I'm currently looking for an internship to widen my skills in the subject. I have lived in the " +
      "Bay Area for most of my life, but before that, I lived in India and Los Angeles. My hobbies " +
      "include working out, playing video games, reading, and hanging with friends.",
  },
  {
    key: "matthew",
    memberName: "Matthew Madore",
    memberRole: "Backend Lead",
    memberBio:
      "I'm a undergraduate student studying computer science at San Francisco State University. " +
      "I am a Bay Area native but now live in Portland, Oregon. I was a music teacher for several " +
      "years before returning to school full-time to pursue my new passion of learning how computers work. " +
      "After I complete my degree I would be interested in artificial intelligence or game design and devolopment.",
  },
  {
    key: "jose",
    memberName: "Jose Atienza",
    memberRole: "Scrum Master",
    memberBio:
      "Hello my name is Jose Miguel Atienza, I am an undergrad student majoring in Computer Science. " +
      "I hope to get into software developing after I graduate. I am from Rancho Cucamonga, California " +
      "and moved to San Francisco for college and I am currently attending SFSU as a 4th year. My hobbies " +
      "include reading manga and watching anime. I also played for my school's rugby team and have grown " +
      "to love the sport and of course I like to play video games.",
  },
  {
    key: "eugene",
    memberName: "Eugene San Juan",
    memberRole: "Git Master",
    memberBio:
      "I'm currently an Undergrad student majoring in Computer Science. " +
      "I'm aiming to get into the IT field after graduation. I've lived in the Bay Area " +
      "for most of my life, moving around between SF, Daly City, and South City. On my " +
      "free time I enjoy watching/playing basketball as well as listening to music and " +
      "sometimes playing games.",
  },
  {
    key: "mohammad",
    memberName: "Mohammad Abdelrahman",
    memberRole: "Database Admin",
    memberBio:
      "I'm a computer science undergraduate student passionate about software development. " +
      "Currently seeking an internship opportunity to further develop my skills and add value to the team.",
  },
];

export default function MembersPage() {
  return (
    <div id="members">
      <div id="Title">Meet the Team!</div>
      <Carousel autoplay autoplaySpeed={10000} style={{ display: "block" }}>
        {bios.map((bios) => {
          return (
            <div id="carousel-container" key={bios.key}>
              <h1>{bios.memberName}</h1>
              <h2>({bios.memberRole})</h2>
              <h3>
                <Image
                  src={`/team/${bios.key}.jpg`}
                  alt="member-pictures"
                  width="400%"
                  height="400%"
                />
              </h3>
              <p>{bios.memberBio}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
