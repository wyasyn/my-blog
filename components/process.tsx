import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import SectionTitle from "./section-title";

const processStages = [
  {
    id: 1,
    stage: "Planning & Requirements Gathering",
    description:
      "I start by defining clear objectives, scope, and key deliverables. I gather stakeholder requirements and map out a development roadmap.",
    time: "1-2 weeks",
  },
  {
    id: 2,
    stage: "System Design & Architecture",
    description:
      "Next, I design the system architecture, create database schemas, and choose the right technologies. I also sketch wireframes and UI/UX mockups.",
    time: "1-2 weeks",
  },
  {
    id: 3,
    stage: "Development & Implementation",
    description:
      "I build the backend APIs, develop frontend components, and integrate necessary third-party services while ensuring best coding practices and version control.",
    time: "4-8 weeks",
  },
  {
    id: 4,
    stage: "Testing & Quality Assurance",
    description:
      "I conduct rigorous unit tests, integration tests, and user acceptance testing (UAT) to ensure everything runs smoothly. I also focus on optimizing performance and fixing bugs.",
    time: "2-4 weeks",
  },
  {
    id: 5,
    stage: "Deployment & Monitoring",
    description:
      "I deploy the project to production, set up CI/CD pipelines, and continuously monitor application performance, security, and scalability.",
    time: "1-2 weeks",
  },
  {
    id: 6,
    stage: "Maintenance & Continuous Improvement",
    description:
      "I keep improving the project by gathering user feedback, releasing updates, and enhancing performance. I also implement new features as needs evolve.",
    time: "Ongoing",
  },
];

export default function ProjectProcess() {
  return (
    <div className=" mb-14">
      <SectionTitle
        title="My Project Implementation Process"
        subtitle="How I Build & Deliver Software Solutions"
      />
      <Timeline defaultValue={5} className="mx-auto max-w-lg">
        {processStages.map((item) => (
          <TimelineItem
            key={item.id}
            step={item.id}
            className="group-data-[orientation=vertical]/timeline:sm:ms-32"
          >
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineDate className="group-data-[orientation=vertical]/timeline:sm:absolute group-data-[orientation=vertical]/timeline:sm:-left-32 group-data-[orientation=vertical]/timeline:sm:w-20 group-data-[orientation=vertical]/timeline:sm:text-right">
                {item.time}
              </TimelineDate>
              <TimelineTitle className="sm:-mt-0.5 font-sans">
                {item.stage}
              </TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
            <TimelineContent className="max-w-[40ch]">
              {item.description}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
