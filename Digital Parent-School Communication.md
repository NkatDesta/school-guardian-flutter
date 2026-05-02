# ADDIS ABABA UNIVERSITY
COLLEGE OF NATURAL AND COMPUTATIONAL
SCIENCES
DEPARTMENT OF COMPUTER SCIENCE
DIGITAL PARENT-SCHOOL COMMUNICATION
SYSTEM
COMPUTER SCIENCE: FINAL PROJECT
BY
Mekdes Deriba UGR/5104/15
Nikat Desta UGR/5001/15
Rehima Yesuf UGR/5799/15
Welebe Kebede UGR/7890/15
PROJECT ADVISOR: Beimnet G.
JANUARY 2026
I
DECLARATION
This is to declare that this project work, which was done under the supervision of Ms.
Beimnet Girma and has the title Digital Parent-School Communication System, is the sole
contribution of:
Mekdes Deriba UGR/5104/15
Nikat Desta UGR/5001/15
Rehima Yesuf UGR/5799/15
Welebe Kebede UGR/7890/15
```
No part of the project work has been reproduced illegally (copy and paste), which would
```
constitute plagiarism. All referenced parts have been used to argue the idea and have been
cited properly. We will be responsible and liable for any consequences if violation of this
declaration is proven.
```
Date: 28/01/2026
```
Group Members:
Full Name Signature
____________________________ ____________________________
____________________________ ____________________________
____________________________ ____________________________
____________________________ ____________________________
II
CERTIFICATE
I certify that this BSc final project report, entitled Digital Parent-School Communication
System by:
Mekdes Deriba UGR/5104/15
Nikat Desta UGR/5001/15
Rehima Yesuf UGR/5799/15
Welebe Kebede UGR/7890/15
is approved by me for submission. I certify further that, to the best of my knowledge, the
report represents work carried out by the students.
Date Name and Signature of Supervisor
_______________________________ _________________________________
III
ACKNOWLEDGEMENT
We begin by expressing our deepest gratitude to the Almighty God, whose guidance and
blessings have been our constant source of strength and inspiration throughout the journey of
completing this project.
We are deeply thankful to Ms. Beimnet Girma for her exceptional guidance, insightful
critiques, and unwavering support. Her expertise and encouragement have been invaluable in
shaping the success of this project.
We also extend our heartfelt appreciation to the esteemed faculty & staff of the Computer
Science Department. Their dedication in providing clear project guidelines and imparting
comprehensive knowledge has been instrumental in equipping us with the skills necessary for
this endeavour.
Finally, we are sincerely grateful to everyone who contributed to this project, especially Mr.
Mignot Sahilu, the director of the Hawi Dandi Boru Kindergarten and those who actively
participated in the requirement-gathering process and offered their support along the way.
Your cooperation and encouragement have been indispensable in bringing this project to
fruition.
IV
Table of Contents
CHAPTER 1 - PROJECT PROPOSAL ........................................................................... 1
1.1. Introduction .........................................................................................................1
1.2. Statement of the Problem and Justification ............................................................. 1
1.3. Project Objective ................................................................................................. 3
1.3.1. General Objective of the System ......................................................................3
1.3.2. Specific Objectives of the System ....................................................................3
1.4. Scope of the project ............................................................................................. 4
1.5. System Development Methodology ....................................................................... 5
```
1.5.1. Investigation (Fact-Finding) Methods .............................................................. 5
```
1.5.2. System Development Tools ............................................................................ 6
1.6. Significance of the Project .................................................................................... 6
1.7. Beneficiaries ....................................................................................................... 7
1.8. Time Schedule .....................................................................................................8
CHAPTER 2 - REQUIREMENT ANALYSIS ..................................................................9
```
2.1. Introduction (Purpose of the System) ..................................................................... 9
```
2.2. Current System ....................................................................................................9
2.2.1. Major Functions of the Current System / Current System Description ................. 9
2.2.2. Problem of the Existing System .....................................................................10
2.3. Requirement Gathering .......................................................................................10
2.3.1. Requirement Gathering Methodologies .......................................................... 10
2.3.2. Results Found ..............................................................................................11
2.4. Proposed system ................................................................................................ 12
2.4.1. Overview .................................................................................................... 12
2.4.2. Functional Requirements .............................................................................. 18
2.4.3. Non-Functional Requirements .......................................................................18
2.4.3.1. User Interface and Human Factors ........................................................... 19
2.4.3.2. Documentation ...................................................................................... 19
2.4.3.3. Hardware Consideration ......................................................................... 19
2.4.3.4. Performance Characteristics ....................................................................19
2.4.3.5. Error Handling and Extreme Conditions ...................................................20
2.4.3.6. Quality Issues ........................................................................................ 20
2.4.3.7. System Modifications .............................................................................20
2.4.3.8. Physical Environment .............................................................................20
V
2.4.3.9. Security Issues .......................................................................................21
2.4.3.10 Resource Issues .................................................................................... 21
2.5. Constraints / Pseudo Requirements ...................................................................... 21
2.6. System Model ................................................................................................... 22
2.6.1. Scenario ......................................................................................................22
2.6.2. Use Case Model ...........................................................................................30
2.6.2.1. Use Case Diagram ................................................................................. 30
2.6.2.2. Description of Use-Case Model ............................................................... 30
2.6.3. Object Model .............................................................................................. 38
2.6.3.1. Data Dictionary ..................................................................................... 38
2.6.3.2. Class Modelling .....................................................................................38
2.6.3.2. Class Modelling .....................................................................................44
2.6.4. Dynamic Modeling ...................................................................................... 45
2.6.4.1 Sequence Diagrams .................................................................................... 45
2.6.4.2. Activity Diagrams ..................................................................................52
2.6.5. User Interface .............................................................................................. 54
CHAPTER 3 - SYSTEM DESIGN ................................................................................57
3.1. Introduction .......................................................................................................57
3.2. Current Software Architecture .............................................................................57
3.3. Proposed Software Architecture .......................................................................... 57
3.3.1. Overview .................................................................................................... 57
3.3.2. Subsystem Decomposition ............................................................................ 58
3.3.3. Hardware/Software Mapping ........................................................................ 61
3.3.4. Persistent Data Management ......................................................................... 63
3.3.5. Access Control and Security ......................................................................... 65
3.3.5.1. Access Control ...................................................................................... 65
3.3.5.2. Security Mechanisms ............................................................................. 66
3.3.6. Subsystem Services ......................................................................................67
3.4. Detailed Class Diagram ...................................................................................... 68
3.5. Packages ........................................................................................................... 73
REFERENCES ........................................................................................................... 78
APPENDICES ............................................................................................................ 79
VI
List of Tables
Table 2.1 Guardian Registration Scenario .............................................................................. 23
Table 2.2 User Login Scenario ............................................................................................... 23
Table 2.3 Manage User Profile Scenario ................................................................................ 24
Table 2.4 Student Pickup Authorization Scenario ...................................................................24
Table 2.5 Student Pickup Request Form Scenario ..................................................................25
Table 2.6 Internal Messaging Scenario ...................................................................................26
Table 2.7 Notification Management Scenario ........................................................................ 27
Table 2.8 Event Management Scenario .................................................................................. 27
Table 2.9 Homework Communication Management Scenario ...............................................28
Table 2.10 Report Card Viewing Scenario ............................................................................. 29
Table 2.11 Use Case Description for Guardian Registration Use Case ..................................31
Table 2.12 Use Case Description for User Login Use Case ................................................... 32
Table 2.13 Use Case Description for Manage User Profile Use Case ....................................33
Table 2.14 Use Case Description for Student Pickup Authorization Use Case ......................33
Table 2.15 Use Case Description for Student Pickup Request Form Use Case ..................... 34
Table 2.16 Use Case Description for Internal Messaging Use Case ...................................... 35
Table 2.17 Use Case Description for Notification Management Use Case ............................35
Table 2.18 Event Management Use Case ............................................................................... 36
Table 2.19 Use Case Description for Homework Communication Management Use Case .. 37
Table 2.20 Use Case Description for Report Card Viewing Use Case ...................................37
Table 2.21 Attributes of the User class ...................................................................................38
Table 2.22 Attributes of the GuardianRegistration class ........................................................ 39
Table 2.23 Attributes of the Student class .............................................................................. 40
Table 2.24 Attributes of the Classroom class ......................................................................... 40
Table 2.25 Attributes of the PickupRequest class .................................................................. 40
Table 2.26 Attributes of the Message class ............................................................................ 41
Table 2.27 Attributes of the Notification class ....................................................................... 41
Table 2.28 Attributes of the Event class ................................................................................. 42
Table 2.29 Attributes of the HomeworkInfo class ..................................................................42
Table 2.30 Attributes of the ReportCard class ........................................................................43
Table 2.31 Attributes of the Guardian class ............................................................................43
Table 2.32 Attributes of the Teacher class ..............................................................................43
Table 2.33 Attributes of the Director class ............................................................................. 43
Table 2.34 Attributes of the HomeRoomTeacher class .......................................................... 44
Table 2.35 Attributes of the GuardianPickup class ................................................................ 44
Table 3.1 Access Privilege Table ............................................................................................66
Table 3.2 Subsystem Service Description .............................................................................. 68
VII
List of Figures
Figure 1.1 Project timeline for semester 1 ................................................................................ 8
Figure 1.2 project time line for semester 2 ............................................................................... 8
Figure 2.1 Use case Diagram .................................................................................................. 30
Figure 2.2 Class Diagram ....................................................................................................... 44
Figure 2. 3 Sequence Diagram for Guardian Registration use case ....................................... 45
Figure 2.4 Sequence Diagram for User Login use case .........................................................46
Figure 2.5 Sequence Diagram for Manage User Profile use case ...........................................46
Figure 2.6 Sequence Diagram for Student Pickup Authorization use case ............................ 47
Figure 2.7 Sequence Diagram for Student Pickup Request Form use case ............................ 48
Figure 2.8 Sequence Diagram for Internal Messaging use case ............................................. 48
Figure 2.9 Sequence Diagram for Notification Management use case ...................................49
Figure 2.10 Sequence Diagram for Event Management use case ...........................................49
Figure 2.11 Sequence Diagram for Homework Communication Management use case ....... 50
Figure 2.12 Sequence Diagram for Report Card Viewing use case ....................................... 51
Figure 2.13 Activity Diagram for Guardian Registration use case .........................................52
Figure 2.14 Activity Diagram for Student Pickup Request Form use case ............................ 53
Figure 2.15 Activity Diagram for Homework Communication Management use case ......... 54
Figure 2.16 UI Design for Guardian Registration .................................................................. 55
Figure 2.17 UI Design for User Login ....................................................................................55
Figure 2.18 UI Design for Student Pick up Request Form ................................................... 56
Figure 2.19 UI Design for Homework Page ........................................................................... 56
Figure 3.1 Three-Tier Architecture for the System ................................................................ 58
Figure 3.2 Package Diagram ...................................................................................................62
Figure 3.3 E-R Diagram .........................................................................................................64
Figure 3.4 Detailed Class Diagram for User Management Subsystem .................................. 69
Figure 3.5 Detailed Class Diagram for Guardian Management Subsystem ........................... 70
Figure 3.6 Detailed Class Diagram for Homework Management Subsystem ........................ 70
Figure 3.7 Detailed Class Diagram for Event Management Subsystem .................................71
Figure 3.8 Detailed Class Diagram for Academic Performance & Report Card Subsystem . 71
Figure 3.9 Detailed Class Diagram for Notification Management Subsystem .......................72
Figure 3.10 Detailed Class Diagram for Communication Subsystem .......................... 72
Figure 3.11 Package Diagram .................................................................................................77
1
CHAPTER 1 - PROJECT PROPOSAL
1.1. Introduction
In early-childhood education, communication has an important role to play in ensuring the
safety of students, their emotional growth, and consistent parental interaction. In kindergarten
settings, children are at an age where they cannot be relied upon to communicate effectively
and promptly, and it is therefore necessary to have direct and immediate communication
between schools and guardians. Nevertheless, a lot of early-childhood facilities are still
relying on manual and paper-based forms of communication, including paper notices sent
through students, verbal messages during pick-up hours, notebooks, and similar. These
conventional methods are cumbersome, unreliable, and often they lose information or
misinterpret.
Even though other schools have tried to make use of phone calls, messaging applications, or
even informal group chats, these are not structured, not private, and tend to confuse personal
and professional messages. These disjointed tools will not accommodate any specialized
requirements of a kindergarten center that need rapid contact in emergencies, stringent
student-pickup authorization, as well as a reliable means of exchanging daily behavioural
feedback, attendance, and individual child progress reports.
The Digital Parent-School Communication System for Nursery and Kindergarten Schools
will overcome these drawbacks by establishing a safe, centralized, and age-relevant platform.
This system helps to provide real-time notices, daily status updates on the behaviour or
activities of a child, electronic permission to pick the child up, and a smooth interaction
between the teachers and guardians. The platform reinforces the collaboration that is vital in
the development of early childhood, given that the younger children need to be under
constant observation and their guardian notified immediately in case of health issues or
emotional alterations.
1.2. Statement of the Problem and Justification
A. Statement of the problem
The systematic hindrance to performance, student safety, and educational cooperation lies in
the fact that the school-parent communication still remains manual and paper-based. The
main problem is a disjointed and unreliable informational ecology, which leads to the
following major inefficiencies:
CHAPTER 1 - PROJECT PROPOSAL
2
1. Inefficiency and Error-Prone Administration:
Manual operations on repetitive work are also time-consuming activities that school
workers conduct, such as handling paper-based student data, physical distribution of
messages, monitoring permission slips, and phone logs. Not only is this process likely
to result in data loss, misplacement, and transcription errors, but it also removes vital
resources from the main instructional duties. This pertains to the safety of students
during emergencies when the school is unprepared to deal with them.
2. Students' safety and delayed emergency response:
```
The absence of an instantaneous and multi-channel system of immediate alerts (e.g.,
```
```
school closures, health issues) makes it vulnerable to a major risk. The parents are not
```
contacted on a real-time basis, which may slow down the response time and endanger
the safety of the students in case of a crisis.
3. Limited parental involvement:
The information asymmetry means that the parents and guardians do not have a
unified, real-time system to see the academic progress of their child, school news, or
even the school schedule. Communication is slow, ineffective, and often through the
intermediation of kids, creating a significant "communication barrier" that negates the
much-needed home-school relationship that leads to student achievement.
4. Non-Scalable and Insecure Processes:
The manual processes do not work as the number of students grows. Hard copy
documents are not safe, difficult to audit, and not ecologically sustainable. The
present paradigm does not have the infrastructure required to sustain an expanding
and modern educational society.
B. Justification
The introduction of the Digital Parent-School Communication System is a strategic
requirement to change the functionality of schools from a reactive, administrative load to a
proactive, working alliance.
This project can be explained by the fact that it fits perfectly into the following institutional
```
goals:
```
1. To attain Operational Excellence:
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
3
Automation of the system will save on manual labor, human error, and long-term
operational costs related to paper supplies and inefficient processes through manual
labor communication and administration. This enhances the productivity of
institutions instantly.
2. To prioritize student safety:
The system includes features such as digital guardian verification to pick the students
up, automatic mass emergency alerts, and role-specific access to confidential data.
3. To encourage open and empowered participation:
Through creating a safe and full-time available digital platform, parents can obtain
accurate information on their child's school life on time. This transparency creates a
sense of trust, active involvement, and active support of the relationship between
parents and educators, which is already known to work in improving student
performance.
4. To build a scalable and sustainable foundation:
This online product will be scalable, and it will be able to serve a larger user base
without incurring significant administrative expenses as the number of users increases.
It is a viable and sustainable investment that will be possible in the future and can
assist the institution to shed old fashioned practices that waste a lot of resources.
Basically, this project will be a simple re-organization of school communication and not
simply a technological update. It is considered to be necessary to establish a stronger,
connected, efficient, and secure educational environment where all stakeholders are
empowered to play their effective part in developing students and academic success.
1.3. Project Objective
This section shows the goals that the proposed system will attempt to accomplish. The
objectives are broken down into a general objective and specific objectives.
1.3.1. General Objective of the System
To design and develop a secure and centralized electronic system which enhances the parent-
school interaction process, coordination, and efficient transfer of academic and safety-related
information in a timely manner.
1.3.2. Specific Objectives of the System
CHAPTER 1 - PROJECT PROPOSAL
4
Specific features of the system are:
1. To come up with a user management subsystem that will enable secure user
registration, authentication, role-based access control, and profile management of
system admins, teachers, directors, and guardians.
2. To develop a guardian management subsystem that has the ability to keep the
guardians' records correct and has management of the guardian-student relationships,
including student pickup authorization and verification.
3. To establish an effective communication subsystem between the homeroom teachers
and the guardians in two-way directions.
4. To offer a notification management system that will deliver the timely notification
regarding special events, emergencies, and other important announcements as in-app
and email notifications.
5. To insert an event calendar module, which will display the activities, examinations,
and meetings of the school in the future and provide notifications to the guardians.
6. To design a homework management system that will allow teachers to set homework
```
details (like subjects) and guardians to view details and provide feedback.
```
7. In order to provide a report card sharing tool that will help the homeroom teachers
publish the academic performance information and enable guardians to get reports
and simple statistical analysis.
8. Proper validation, password hashing, access control, and friendly interfaces are
required in order to maintain data security, reliability, and usability.
1.4. Scope of the project
The scope of this project is to develop a safe web-based digital communication platform
specifically for kindergarten schools. It will ease the parent-school relationships as it will
enable the teachers to communicate with the guardians, facilitate school-wide communication,
provide student and guardian information, provide pickup permission, organize events, and
send timely messages. The role-based access control and secure authentication will ensure
that the administrator of the system, teachers, and guardians can comprehend the information
related to the system with the necessary safety. The site is child-oriented, and its orientation
to the needs of early-childhood education settings in which the safety of children,
communication, and convenience are the major concerns.
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
5
The scope of this project does not intend to be a complete school management or academic
```
system. The learning management tools, student grading, financial services (making fee
```
```
payment), transport or bus tracking, biometric or hardware-based verification, and mobile
```
application development are some of the features. The system will only be restricted to the
kindergarten institutions and is not geared towards the complicated operation requirements of
the higher education levels. This narrow scope will make the project viable and will be able
to cater to the most significant communication and safety requirements in early-childhood
education.
1.5. System Development Methodology
The Digital Parent-School Communication System is developed in the framework of the
Agile Scrum process, which is planned to be arranged in weekly blocks, as functional
modules would be designed, implemented, and reviewed sequentially within the project
timeframe, which is an iterative and flexible model that will enable the system to be
developed in stages and corrected in accordance with the user feedback. System requirements
are elicited by the structured fact-finding methods that include the interviews with the
director, the surveys of the guardians and teachers, and the observation of the school activity,
so that the system responds to the actual working requirements.
User stories, functional scenarios, and business rules represent requirements and system
behavior and are managed by a prioritized backlog to make sure that development is focused
on the most important features. A component-based and modular design is adopted to
implement the system, which offers maintainability and scalability. New techniques, like
reusable module design, event-driven logic, and automated test techniques like unit testing,
component testing, and integration testing, are utilized so that reliability, maintainability, and
uniform system performance are guaranteed during the development process.
```
1.5.1. Investigation (Fact-Finding) Methods
```
The mix of interviews with the director, and also guardians' and teachers' questionnaires and
surveys, direct observation of the daily working processes, and the analysis of the existing
documents like forms and manuals were used to collect the system requirements. The
information was then gathered to develop use case scenarios, system interactions, actor goals,
and exception handling to give a clear blueprint to use in development.
CHAPTER 1 - PROJECT PROPOSAL
6
1.5.2. System Development Tools
```
Frontend: Next.js
```
```
Backend: Node.js
```
```
Database: MySQL
```
Security and Authentication: JWT
Version Control: Git with GitHub
```
IDE: Visual Studio Code
```
API Testing: Postman
```
Deployment: Netlify
```
1.6. Significance of the Project
The Digital Parent-School Communication System fills a major gap in the interaction
between schools and guardians within the school setting, particularly in a school environment
where quick, structured, and consistent communication is key in the development of the
students. Conventional ways of communication like paper messages, oral messages that are
passed on by students, or random phone calls usually cause delays, loss of information, and
confusion. Our system brings in a new technology-based system that leads to transparency,
accountability, and efficiency in the communication process.
Societal Importance:
● Empowering the Parent-School Relationships.
● Improving Safety and Support of Students.
● Promoting Inclusivity
● Reducing Miscommunication
Technological Importance:
● School Modernization of Communication
● Basis for Growth in the Future.
● Advocacy of Digital Transformation in Schools.
By addressing communication barriers between schools and guardians, this project helps
society through better student performance and the technological aspect of showing the real-
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
7
life application of the use of modern information systems. The Digital Parent-School
Communication System is a valuable move towards the establishment of safer, more
informed, and more involved school communities.
1.7. Beneficiaries
The digital parent-school communication system will be useful to various stakeholders in the
school community. The main users of the software can be defined as follows:
1. Director
The system will also be beneficial to the directors by enabling them to have better
control, organization, and monitoring of school activities. The system is free of
limitations on user management, event management, notifications, and reports,
meaning that the directors can make suitable decisions, enhance the efficiency of their
operations, and make sure that their students are safe.
2. Teachers
Teachers will have access to simplified communication and academic administration
systems that will minimize the number of papers they have to fill in and improve the
connection with guardians. The system assists in academic communication, whereby
homework can be sent as a broadcast to the guardians of students, report cards can be
shared by homeroom teachers, and a graphical comparison of the two semesters is
used to display the end-of-year academic performance.
3. Guardians
The main beneficiaries of the system are the guardians because they have access to
```
the real-time information about their children (academic and school-related). They are
```
able to receive notices and announcements, correspond with teachers, view homework,
grade and performance reports, , be reminded about events and meetings, and request
pickup authorization, which increases parental participation and prompts them to be
aware of student progress and safety in time.
4. Students
Students do not have to communicate with the system directly, but will have indirect
benefits such as having better academic monitoring, communication between the
school and the guardians, timely homework follow-up, and increased safety during
the school pick-up and emergency.
CHAPTER 1 - PROJECT PROPOSAL
8
5. School
The school institution will have better data management, fewer gaps in
communication, more security, and a more modern digital system that facilitates
transparency and efficiency. The software also serves to ensure that the school keeps
the correct records and gains trust with guardians.
1.8. Time Schedule
Figure 1.1 Project timeline for semester 1
Figure 1.2 project time line for semester 2
9
CHAPTER 2 - REQUIREMENT ANALYSIS
```
2.1. Introduction (Purpose of the System)
```
The Digital Parent-School Communication System aims at establishing a secure and user-
friendly system where the schools can easily communicate with the guardians and vice
versa. The given system is aimed at substituting the old-fashioned manual approaches, i.e.,
the use of paper communication books and phone calls, with the real-time information
concerning the academic progress of students, as well as the school life. It also improves
the safety of the students with the help of the checked identification of the guardians,
reduces the risk of lost or delayed information, provides precise and regular distribution
of the important announcements, and promotes the active participation of the parents in
the process of the education.
2.2. Current System
The school and the guardians communicate with each other primarily through the paper-
based mode of communication: books, telephone, and face-to-face meetings. The student
and guardian data are kept physically in the school offices, and therefore data retrieval
and updating are time-consuming and inefficient processes.
Issues regarding guardians are given face-to-face and through the phone. Record, tracking,
and management of change of guardian status are not done by computer means. The
school has instead employed general norms and staff guidelines as opposed to a specific
structure or approach to managing transitions of guardians.
The student pickup period is conducted by checking student identification cards with the
student guardians. Alterations made to the information of a guardian must be done in
person, and a guardian must ask a director of the school to make the necessary changes.
Since it is not a digital database, the student records, along with the guardians, are spread
to physical files, which are more likely to be lost, become inconsistent, and slow access to
the information.
In general, the current system is not efficient, secure, and flexible, and it is not possible to
deliver timely communications, proper record keeping, and reliable verification of guards.
2.2.1. Major Functions of the Current System / Current System Description
The primary functions of the existing system are the following:
CHAPTER 2 - REQUIREMENT ANALYSIS
10
● The data regarding students and guardians are collected manually through the use
of paper data.
● The verification of the guardians is carried out by the use of physical ID cards
when picking up a student.
● Phone conversations, written alerts, and communication books.
● Storing papers in real cabinets and files.
● Manual entry of guardians in the school is done by the administrators.
2.2.2. Problem of the Existing System
● Absence of Centralization: Information is spread to paper records, phone
conversations, and messaging applications, and it becomes hard to follow and
control.
● Ineffective Security: There is inadequate security of student and guardian
information, which is being sent over unprotected channels without authentication
or access control.
● Late Receiving of Announcements: Parents might miss important announcements
or even fail to receive them.
● No Role-Based Access: There is no distinction in access to data by administrators,
teachers, and guardians.
● Data Loss Risk: Soft copies are easily lost or destroyed, as are paper documents
and informal electronic messages.
● Low responsibility: No message history or notification log is left to identify the
flow of information sent or received.
● Weak Parent Engagement: Parents are not easily able to track homework, grades,
and activities in real time.
2.3. Requirement Gathering
2.3.1. Requirement Gathering Methodologies
1. Interview: An interview was conducted with the director of the Hawi Dandi Boru
Kindergarten, Mr. Mignot Sahlu, in order to know the current communication system of
the school system and their issues.
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
11
2. Survey: In order to solicit responses from a group of stakeholders, we administered
parent, teacher, and school administrator survey questions.
3. Observation: We had the opportunity to observe the functioning of the existing system
and its orientation towards the use of parent-teacher communication books by the teachers.
4. Document Analysis: We have observed the school policies and processes of
communication about the guards and picking up students.
5. Use Case Development: The use cases that we developed were very descriptive in
nature in order to arrange the functionalities of the system. These use cases brought out
these scenarios, which included:
● How to contact guardians on how to pick up students.
● Checking of guardians during student pickup.
● Methods of transmitting guardian emergency warnings.
2.3.2. Results Found
The results of the interview with the school director, the parent/guardian survey, and the
teacher survey showed that the existing system of guardian information management and
parent-school communication used in the school is mostly manual and paper-based and
thus inefficient, slow, and even has security risks. The physical records of guardians are
kept in physical files, thus making it hectic and error-prone to update and verify any
information. The cross-checking of paper records and staff familiarity are the keys to the
verification of the guardians when picking up students, which predisposes the likelihood
of the cases of unauthorized pickups and misunderstandings.
Parents as well as teachers affirmed that their communication with the school is mainly
done through communication books, phone calls, or even face-to-face communication,
which is not usually regular and prompt. There were numerous complaints by parents
about receiving late or incomplete information about the academic or behavioral
problems of their child. Educators also added that such delays have an impact on their
communication skills with guardians and their effectiveness in handling matters relating
to students. The answers of the surveys showed the general dissatisfaction with the
existing system, as parents have reported the fear of missing or not reading messages, and
the teachers have stated that it is a time-consuming and error-prone process of record-
keeping.
CHAPTER 2 - REQUIREMENT ANALYSIS
12
The results of surveys showed that both parents and teachers are more inclined towards a
digital communication system. According to the parents, the interview revealed that they
would appreciate functionality like SMS notifications, the emergency notification, the
homework notification, the event notification, the academic performance notification, and
the secure pickup notification. The teachers emphasized the need to have automated
notifications and digital guardian verification to enhance the efficiency of workflow,
minimize the errors, and make sure that the information associated with students is
conveyed in an effective and efficient manner. Moreover, the two groups pointed out that
a digital system would lead to accuracy, traceability, and general stakeholder satisfaction.
Lack of a digital system will be problematic regarding the privacy and security of the data
because it is possible to misplace paper records, or they can be accessed by unauthorized
persons. On the whole, the results indicate that there is a severe necessity for a reliable
and efficient parent-school communication system that will be able to deliver real-time
updates, assure guardians verification, provide automatic notifications, and enhance
communication between the school and parents. A system like this would help overcome
the difficulties outlined by the school director, parents, and teachers and greatly enhance
the safety, efficiency, and satisfaction levels of all the stakeholders.
2.4. Proposed system
2.4.1. Overview
The Digital Parent-School Communication System proposed is a secure web-based
information system, which supports structured, traceable, and role-controlled
communications between a kindergarten school and the guardians of the students who are
enrolled. The system is designed to operate in one school organization and is the major
digital means of communication in schools in regard to academics and administration.
All interactions are controlled by a workflow since a guardian enters the system. The
process starts with a guardian registering with a request to the system with his/her
personal information and with the documents, which are needed to be registered. It is not
automatically granted, but the requests are considered by the Registrar Office in order to
provide access only to the legitimate guardians. After the approval, the guardian account
is turned on, and safe login keys are provided.
Once authenticated, the user is redirected to role-specific dashboards that show only the
functionality that the user is supposed to be doing. Guardians can access only the
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
13
information about their own children, such as their homework, report cards, school news,
and events. Teachers receive access to tools related to the classroom where they can leave
homework assignments, messages to parents on school-related issues, and collect
feedback. Homeroom teachers are allowed extra duty, which concerns the classroom
management and submission of report cards.
The system of academic communication is structured towards information sharing as
opposed to academic processing. Subject teachers post instructions and advice on
homework, and this can be read by guardians, and comments can be made on it. Every
homework perspective is automatically logged in to ensure accountability. Report cards
work in a regulated manner: the homeroom teacher keyboards in the academic findings,
which have been computed outside the system, which are revoked and certified by the
school director and consequently handed over to the guardians. The system does not
```
compute grades or measure the performance of students; it is merely a secure system of
```
communicating completed academic records and presenting simple progress summaries.
A developed pickup authorization system aids in student safety. Parents can also request
pickup through advance requests whereby certain individuals are given the mandate to
pick up a student. The presentation of physical identification during pickup day is
checked against the stored request by a teacher, and the student is released. The pickup
actions, whether approved or rejected, are recorded with timestamps in order to have a
sound audit trail.
Besides the communication in schools, the system facilitates school-wide announcements,
emergency messages, and arrangement of events. Notifications can be published by
authorized administrative users and allow the guardians to view all the pertinent updates
on their dashboards and control the school event calendar. Even though the system
identifies conflicts in the schedules, it fails to resolve these conflicts automatically, and
therefore the conflict resolution is a human task.
Role-based access control, secure authentication, and overall accountability of all
activities are enforced throughout the system to guarantee the confidentiality of data and
accountability and institutional supervision. The system is not focused on the advanced
automation, decision-making, or hardware integration and supports the idea that it is a
communication and verification platform and not a complete school management system.
The system enhances reliability of communication because of the clear definition of
CHAPTER 2 - REQUIREMENT ANALYSIS
14
responsibilities and constraints, parental involvement, and the system facilitates the daily
operations of the school, and the system has clear boundaries in place.
System Actors, Roles, and Responsibilities
I. Director
```
Position: System owner and oversight responsibility.
```
```
Responsibilities:
```
● Manages communication in the school.
● Prepares and organizes school announcements and events.
● Delivers urgent and high-priority messages.
● Signs completed student report cards, which are turned in by homeroom teachers.
```
Constraints:
```
● Does not input or update academic data.
● Does not compute and adjust student grades.
● Lacks no internal communication with guardians.
II. Registrar/Registrar Office
```
Role: Authorization and verification authority.
```
```
Responsibilities:
```
● Overall, it checks system activity.
● Checks guardian registration applications.
● Authorizes, denies, or seeks corrections on guardian registrations.
```
● Authenticates uploaded legal documents (birth certificate or legal guardian
```
```
document)
```
● Make sure that it is inaccessible to unqualified guardians.
```
Constraints:
```
```
● Lacks academic records; does not update academic records.
```
● Lack of communication with the guardians on academic issues.
III. Teacher (Subject Teacher)
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
15
```
Role: Provider of academic content.
```
```
Responsibilities:
```
● Provides instructions and homework guidelines to students.
● Sends letters to parents about homework-related issues.
● Checks student requests, pickup requests, and pickup requests.
```
Constraints:
```
● Oversees computation of student grades.
● Does not develop or prepare report cards.
● Lacks in students and classrooms not within designated duties.
● Does not directly message with guardians.
IV. Homeroom Teacher
```
Role: Major academic and classroom supervisor.
```
```
Responsibilities:
```
● Supervises a given assigned classroom.
● Enters the final academic findings to report card templates.
● Monitors guardian response concerning academic reports.
● Play the primary role of connecting the school and guardians in matters that relate
to the classroom.
● Does the sole role of teaching have the prerogative to correspond to the guardians
directly?
```
Constraints:
```
Fails to endorse report cards individually.
V. Parent or Legal Guardian (Guardian)
```
Role: Student representative and information consumer.
```
```
Responsibilities:
```
● Registers and checks the identity with the submission of documents.
● Views homework updates and report cards of their child.
CHAPTER 2 - REQUIREMENT ANALYSIS
16
● Consider academic statistics during the end of the year.
● Gives feedback regarding homework or report cards.
● Place pickup requests for students.
● Receives communications, informs, and changes events.
```
Constraints:
```
● Is not able to be in touch with teachers who are not related to his or her child.
● Bloggers are unable to send messages to subject teachers or the director using the
internal messaging system.
VI. Student
```
Role: Subject of the system.
```
```
Responsibilities:
```
● None of the systems directly interact.
```
Constraints:
```
● Does not log in or log on to the system.
● Students fail to start communication or actions in the system.
System-Wide Constraint
● The system links every student to a guardian account that is registered.
● Self-registration is only allowed for guardians.
● The director, registrar, teachers, and students are not registered in the system as
staff and student accounts.
```
● Institutional records are pre-existing (i.e., CSV files) and used to provide director,
```
registrar, teacher, and student accounts. The admin will transfer the already
existing records in the school database to the system.
● The system is not responsible for sharing credentials by guardians.
● The system is not applicable in multi-school deployment and is used in one school
institution.
● The system does not compute grades of students and academic performance.
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
17
● Academic evaluation, assessment, and decision-making are not done on the
system.
● Any academic outcomes that are included in the system are calculated on the
outside.
● The system is merely a secure system of storing, approving, sharing, and viewing
finalized academic reports.
● Communication between the guardians and the school staff is limited to
homeroom teachers.
● This system will not allow a direct message between guardians and subject
teachers, the director, or the registrar.
● The system comes in at basic file validation, that is, file type, file size, and
mandatory format checks.
● The system has no ability to interpret, scan, or analyze the contents of uploaded
documents.
● The system is not involved in image recognition, optical character recognition
```
(OCR), biometric verification, or automatic checking of the authenticity of a
```
document.
● All authenticity and verification decisions made to documents are done by
authorized human actors.
● Approved or rejected results of student pickup authorization are registered in the
system, and each action is registered with timestamps, allowing it to be audited.
● This system lacks monitoring, tracking, and evaluation of the status of the student
upon release.
● The system is not involved with the responsibility of the student once released.
● The system does not pass independent decisions and concessions.
● Every sensitive action should be explicitly human verified and approved.
● The system fails to automatically solve scheduling conflicts of school events.
● The system fails to incorporate biometric verification systems or hardware
verification systems.
CHAPTER 2 - REQUIREMENT ANALYSIS
18
● It is only programmed to retain the history of the events that occur within it within
```
a year; such as doing analytics within that year, the system will not retain the staff
```
information once the present academic year is over, and it becomes like a fresh
sheet for the fresh academic year.
2.4.2. Functional Requirements
● The system will enable the users to register accounts using a registration form in
an appropriate manner.
● The system will enable authorized users to create and modify their profile data.
● The system will enable guardians to provide a student pickup request form.
● The system will keep the pickup request and the verification state to be referred to
in the future.
● The system will be able to enable internal communication between the guardians
and homeroom teacher.
● The system will enable authorized users to develop and issue notifications.
● The system will contain a log of all delivered notifications.
● The system will have an event calendar, where upcoming exams, meetings, and
school activities will be shown.
● The system will enable the teachers to develop homework information.
● The system will enable guardians to see the information about homework, with an
option of posting feedback and automatic tracking of the viewing.
● The system will enable the authorized teachers to complete the student results
reports.
● The school director will be able to accept the report card thanks to the system.
● The system will enable the guardians to access the report cards of their kids.
● The system will be compatible with simple statistical analysis of student
performance.
2.4.3. Non-Functional Requirements
Non-functional requirements establish the guideline to the functionality of the system,
and the system is to work flawlessly and efficiently with the users. This part establishes
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
19
the quality features, performance standards, and limitations that the system needs to meet
so that it can be useful and efficient.
2.4.3.1. User Interface and Human Factors
```
Minimalism: Since the guardians might not be equally technical, the interface should be
```
user-friendly, and not more than three clicks should be needed to visit the core features
```
(i.e., to view a message or to request a pickup).
```
```
Responsiveness: The system will be completely responsive to support desktops, tablets,
```
and smartphones since parents will majorly use the system through their mobile phones.
```
Accessibility: The UI must have high contrasting colors and clear typography to make it
```
readable by all the users.
2.4.3.2. Documentation
User Manuals: Separate concise digital manuals shall be provided to the administrators,
teachers, and guardians on how to use certain features.
Technical Documentation: API documentation will be carefully kept to represent the
RESTful endpoints as they need to be scaled in the future.
Installation Guide: An instruction manual on how to install the environment in both cloud
services and off-the-shelf computers.
2.4.3.3. Hardware Consideration
Server Side: The server will be able to operate on standard cloud computing as well as
support Node.js runtime environments.
Client Side: The web app will be designed in a lightweight manner that will run on any
device.
2.4.3.4. Performance Characteristics
Latency at Real-Time: The emergency alerts and pickup authorizations will be sent to the
device of the recipient within 2 seconds after they are generated.
Load Time: The dashboard and the opening pages must be loaded within less than 3
seconds using a regular 4G connection.
```
Concurrency: The system is expected to accommodate a minimum of 100 users (teachers
```
```
and parents) at any given time during the peak period of pickup without collapsing.
```
CHAPTER 2 - REQUIREMENT ANALYSIS
20
2.4.3.5. Error Handling and Extreme Conditions
User Feedback: The system will also give non-technical messages of error to the user
```
(e.g., Invalid Login Credentials, rather than Error 500).
```
Graceful Degradation: In case of the failure of the real-time notification server, the
system will require standard HTTP requests in order to make data available when it is
refreshed.
```
Logging: Any system error that is crucial shall be written in the database or to a log file
```
so that it can be seen by the administration.
2.4.3.6. Quality Issues
```
Availability: The system should be accessible 24 hours a day and 7 days a week, with the
```
parents and authorized users having the opportunity to access the information at any time
```
(day or night). The system will target a 99.9% uptime, without the scheduled maintenance,
```
to have consistent and uninterrupted access to services.
```
Reliability: It will ensure the integrity of data; it will not lose messages and pickup
```
requests after the system restarts.
2.4.3.7. System Modifications
```
Modularity: According to the methodology, it will be a component-based architecture
```
```
(React components) where certain components of the system (e.g., Event Calendar) can
```
be modified without any impact on the rest of the system.
```
Scalability: The backend API will be made decoupled from the frontend to enable the
```
possibility of developing a native mobile app in the future without having to recode the
backend logic.
2.4.3.8. Physical Environment
```
Hosting: The system is not going to need physical servers on the school grounds. It will
```
exist on a cloud platform.
```
Access: The users will be able to access the system through their respective physical
```
```
settings (homes, workplaces) with the help of the internet; no special physical setup will
```
be needed at the user level.
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
21
2.4.3.9. Security Issues
```
Authentication: Authentication should be done by all users using secure logins.
```
Passwords should be hashed.
Session Management: To communicate with the API statistically and securely, sessions
```
have to be handled with the help of JSON Web Tokens (JWT).
```
```
Authorization: Role-Based Access Control (RBAC) should be enforced by the system. An
```
example is that a "Guardian" is not allowed to see the "Admin" dashboard, and a
"Teacher" should only be able to edit grades in the class assigned to them.
Data Privacy: Medical notes and emergency contacts of students must be encrypted or
access controlled.
2.4.3.10 Resource Issues
```
Development Cost: The project will be created with the help of the open-source (Next.js,
```
```
MySQL, Node.js) to keep the licensing costs at a minimum.
```
```
Time: The development will be based on the Agile Scrum timeline with 2-3 week sprints,
```
and it is necessary to pay attention to the schedule to meet the final deadline.
2.5. Constraints / Pseudo Requirements
1. Technology Stack Constraint: The system should be developed with the help of
```
technologies such as MySQL (database), Node.js (backend), and Next.js (frontend). The
```
```
core application should not be done in any other language (such as PHP or Java).
```
2. Scope Constraint: Financial modules (fee payment) and transportation tracking (GPS)
should not be contained in the system because they are out of scope.
3. Regulatory Limit: The system should adhere to the principles of minimum data
protection so that the data about parents and children are not publicly disclosed.
4. Hardware Constraint: The system cannot be based on the biometric scanners or
```
specialized hardware to verify pickup; it should employ the digital/software-based
```
verification method.
5. Language Support: The first version would not have multi-language switching but only
```
one language (presumed to be English or the local language) used in the school as the
```
primary language of instruction/communication.
CHAPTER 2 - REQUIREMENT ANALYSIS
22
2.6. System Model
2.6.1. Scenario
Scenario Name: Guardian Registration
```
Participating Actors: Ms. Hana Ali (Guardian), Registrar Officer
```
```
Goal: Ms. Hana Ali creates a secure guardian account to access the school communication
```
system.
Entry Condition: The registration page is displayed, and Ms. Hana Ali does not have an
existing account.
Flow of Events:
1. The ‘Register as Guardian’ option is selected by Ms. Hana Ali.
2. The Guardian Registration Form is displayed by the system.
3. Personal details are entered by Ms. Hana Ali, and her relationship type(Parent or
```
Legal Guardian) is selected.
```
4. The required document is uploaded by Ms. Hana Ali.
5. The registration request is submitted by Ms. Hana Ali
6. The request is saved by the system with a Pending status.
7. The documents are reviewed and verified by the Registrar Officer.
8. Upon approval, the account is activated by the system, and Ms. Hana Ali is notified.
Alternative Flow
Duplicate Account Detected:
1. The same personal details that already exist are entered by Ms. Hana Ali.
2. The duplicate account is detected by the system.
3. A message indicating that Ms. Hana Ali is already registered is displayed to the
user.
Invalid document by guardian:
1. During document verification, the submitted document is identified as invalid or
does not match the declared relationship.
2. The registration request is rejected.
3. Ms. Hana Ali is notified by the system of the rejection, the reason is provided, and
information about the remaining two correction attempts is displayed.
4. The registration status is set to Pending Correction Required.
Exit Condition: Ms. Hana Ali's account is successfully created and stored in the system.
Quality Requirements:
● Secure password hashing
● Input validation for all registration fields
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
23
● prevention of duplicate accounts
Table 2.1 Guardian Registration Scenario
Scenario Name: User Login
```
Participating Actors: Mr. Mignot (Director), Mr. Daniel Tesfaye (Teacher), Ms. Hana Ali
```
```
(Guardian)
```
```
Goal: The system is accessed and authenticated by Ms. Hana Ali based on role.
```
Entry Condition: A user account is registered, and the login page is displayed.
Flow of Events:
1. A username and password are entered by Ms. Hana Ali.
2. Credentials are verified by the system.
3. Ms. Hana Ali’s role is identified by the system.
4. Ms. Hana Ali is redirected to the appropriate dashboard.
Alternative Flow
Invalid Credentials:
1. If the entered credentials are invalid, an error message is displayed by the system.
2. The login details are requested to be re-entered by Ms. Hana Ali.
Exit Condition: Ms. Hana Ali is authenticated in the system, and access to the role-based
dashboard is granted.
Quality Requirements:
● Secure authentication
● Role-based access control
● Session timeout management
Table 2.2 User Login Scenario
Scenario Name: Manage User Profile
```
Participating Actors: Mr. Mignot ( Director), Mr. Daniel Tesfaye (Teacher), Ms. Hana
```
```
Ali (Guardian)
```
```
Goal: Personal profile information is updated by Ms. Hana Ali.
```
Entry Condition: Authentication of Ms. Hana Ali in the system is performed.
Flow of Events:
1. The profile section is opened by Ms. Hana Ali.
2. The current profile data is displayed by the system.
3. Contact details or passwords are updated by her.
CHAPTER 2 - REQUIREMENT ANALYSIS
24
4. The changes are validated by the system.
5. The updates are saved by the system.
Alternative Flow
Invalid Input:
If invalid data is entered, an error message is displayed by the system, and the information
is corrected by Ms. Hana Ali.
Exit Condition: Successful updating of the profile information in the system is performed.
Quality Requirements:
● Data integrity
● Secure password update
Table 2.3 Manage User Profile Scenario
Scenario Name: Student Pickup Authorization
```
Participating Actors: Ms. Hana Ali (Guardian), Mr. Daniel Tesfaye (Teacher)
```
```
Goal: To verify guardian identity and authorize student pickup.
```
Entry Condition: A valid ID is presented by Ms. Hana Ali upon arrival at the school.
Flow of Events:
1. The ID is presented to Mr. Daniel Tesfaye by Ms. Hana Ali.
2. The ID is entered into the system by Mr. Daniel Tesfaye.
3. Ms. Hana Ali details are displayed by the system.
4. The information is verified by Mr. Daniel Tesfaye.
5. The pickup is approved.
6. The pickup activity is logged by the system.
Alternative Flow
ID Mismatch:
1. If the presented ID does not match the registered details, a mismatch is displayed by
the system.
7. The pickup request is rejected by Mr. Daniel Tesfaye.
2. The incident is logged by the system.
Exit Condition: The pickup is either approved and logged by the system or rejected and
logged by the system.
Quality Requirements:
● Secure identity verification
● Accurate audit trail
Table 2.4Student Pickup Authorization Scenario
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
25
Scenario Name: Student Pickup Request Form
```
Participating Actors: Ms. Hana Ali (Guardian), Mr. Daniel Tesfaye (Teacher), Ms. Hawi
```
```
Tufa (Authorized Person )
```
```
Goal: Ms. Hana Ali authorizes another person to pick up her child.
```
Entry Condition: Ms. Hana Ali and Mr. Daniel Tesfaye accounts are authenticated in the
system.
Flow of Events:
1. The Student Pickup Request Form on the dashboard is opened by Ms. Hana Ali.
2. The Ms. Hawi Tufa’s details (full name, relationship, phone number, national ID)
are entered by Ms. Hana Ali.
3. The request is submitted by Ms. Hana Ali.
4. The information is validated by the system, Ms. Hawi Tufa is linked to the student,
and the request is displayed on the Mr. Daniel Tesfaye’s dashboard.On the pickup
day, the physical national ID is presented at the school by Ms. Hawi Tufa.
5. The presented ID is verified against the pickup request displayed on the dashboard
by Mr. Daniel Tesfaye.
6. If the ID matches, the request is approved by Mr. Daniel Tesfaye.
7. The student is released to Ms. Hawi Tufa.
8. The successful release is recorded by the system.
Alternative Flow
ID Mismatch or Invalid Authorization:
1. If the presented national ID does not match the Ms. Hawi Tufa’s details in the
system, the pickup request is rejected by Mr. Daniel Tesfaye.
2. The rejection and the reason are recorded in the pickup log by the system.
3. The student is not released, and Ms. Hana Ali is notified of the failed pickup
attempt by the system.
Exit Condition: The students are either released to Ms. Hawi Tufa or the pickup request is
rejected.
Quality Requirements:
● Secure authorization
● Accurate record keeping
Table 2.5 Student Pickup Request Form Scenario
CHAPTER 2 - REQUIREMENT ANALYSIS
26
Scenario Name: Internal Messaging
```
Participating Actors: Ms. Sara Bekele (Home Room Teacher), Ms. Hana Ali (Guardian)
```
```
Goal: To enable secure communication between teachers and guardians.
```
Entry Condition: The user is logged into the system.
Flow of Events:
1. A recipient is selected by the sender.
2. The message is composed and sent by the sender.
3. The message is delivered and stored by the system.
Alternative Flow
```
Message Blocked (Unauthorized Communication):
```
1. If the selected recipient is not authorized to communicate with the sender, this is
detected by the system.
2. The message is blocked from being sent by the system.
3. The sender is notified by the system that messaging is not permitted for the selected
recipient.
4. The message is not delivered, and the action is logged by the system.
Exit Condition: The message is successfully sent and recorded.
Quality Requirements:
● Message confidentiality
● Reliable delivery
Table 2.6 Internal Messaging Scenario
Scenario Name: Notification Management
```
Participating Actors: Mr. Mignot (Director), Registrar’s Office
```
```
Goal: Allow authorized users to create, send, and track school notifications.
```
Entry Condition: The user is authenticated in the system.
Flow of Events:
1. The Create Notification option is selected by Mr. Mignot.
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
27
2. The notification form is displayed by the system.
3. The title, content, and recipient are entered.
4. The notification is submitted by Mr. Mignot.
5. The notification is sent, delivery is confirmed, and the details are logged by the
system.
Alternative Flow
Delivery Failure:
1. The notification is marked as Pending by the system.
2. Mr. Mignot is notified by the system of the delivery failure.
Exit Condition: The notification is sent and logged for future reference.
Quality Requirements:
● Prompt delivery
● Complete audit trail
Table 2.7 Notification Management Scenario
Scenario Name: Event Management
```
Participating Actors: Mr. Mignot (Director), Ms. Hana Ali (Guardian)
```
```
Goal: To allow Mr. Mignot to manage school events and Ms. Hana Ali to view relevant
```
events.
Entry Condition: Mr. Mignot is logged into the system.
Flow of Events:
1. The managed event option is selected by Mr. Mignot.
2. The event management interface is displayed by the system.
3. An event is added, updated, or deleted by Mr. Mignot.
4. The changes are saved, and the event calendar is updated by the system.
5. The event dashboard is accessed by Ms. Hana.
6. All events are displayed by the system.
Alternative Flow
Event Conflict:
Mr. Mignot is notified by the system to resolve the conflict.
Exit Condition: The event calendar is updated or displayed successfully.
Quality Requirements:
● Accurate event information
● User-friendly interface
Table 2.8 Event Management Scenario
CHAPTER 2 - REQUIREMENT ANALYSIS
28
Scenario Name: Homework Communication Management.
```
Participating Actors: Mr. Daniel Tesfaye (Teacher), Ms. Hana Ali (Guardian)
```
```
Goal: To facilitate communication between Mr. Daniel Tesfaye and Ms. Hana Ali
```
regarding homework and homework-specific feedback.
Entry Condition: The user is authenticated in the system.
Flow of Events:
1. Homework details for students are added by Mr. Daniel.
2. The homework is viewed by Ms. Hana Ali.
3. Ms. Hana Ali optionally adds a comment or feedback after assisting their child.
4. The homework is automatically marked as seen, and the viewing is logged by the
system regardless of the feedback.
Alternative Flow
No Homework Available:
If no homework has been added by Mr. Daniel for the student, a message indicating
that no homework is available is displayed to Ms. Hana Ali.
Mr. Daniel Does Not Submit Feedback:
If Mr. Daniel chooses not to add any comment or feedback, the homework is still
marked as seen, and the viewing is logged by the system.
Exit Condition: The homework status is recorded.
Quality Requirements:
● Accurate tracking of homework completion
● Data consistency
Table 2.9 Homework Communication Management Scenario
Scenario Name: Report Card Viewing
```
Participating Actors: Mr. Mignot (director), Home Room Teacher (Ms. Sara Bekele),
```
```
Guardian (Ms. Hana Ali)
```
```
Goal: To share and view student academic performance.
```
Entry Condition: Student records exist in the system.
Flow of Events:
1. Report card data, including subjects and results, is entered by Ms. Sara Bekele.
2. The entered data is stored by the system for viewing by Ms. Hana Ali.
3. The report card submission timestamp is recorded by the system to allow Ms. Hana
Ali to request corrections from Ms. Sara Bekele if necessary.
4. The report card is reviewed and approved by Mr. Mignot.
5. Statistical analysis of academic performance is prepared by the system at the end of
the academic year to show student progress differences between the first and second
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
29
semesters.
6. The approved report card and statistical analysis are made available to Ms. Hana Ali
for viewing.
Alternative Flow
Ms. Hana Ali Requests Corrections:
1. Corrections are requested through direct messaging to Ms. Sara Bekele after
viewing the submitted report card.
2. The report card is unlocked by the system for editing.
3. The required corrections are made by Ms. Sara Bekele.
4. The revised report card is approved by Mr. Mignot for Ms. Hana Ali's viewing.
Exit Condition: Homework status is recorded.
Quality Requirements:
● Accurate tracking of academic performance
● Data consistency
Table 2.10 Report Card Viewing Scenario
CHAPTER 2 - REQUIREMENT ANALYSIS
30
2.6.2. Use Case Model
2.6.2.1. Use Case Diagram
Figure 2.1 Use case Diagram
2.6.2.2. Description of Use-Case Model
ID UC 01
Use case Name Guardian Registration
Goal To allow new users to create a secure account in the system.
Participating Actors Guardian, Registrar's Office
Entry Condition The registration page is displayed, and the user does not have an
existing account.
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
31
Flow of Events 1. The Register option is selected.
2. The Guardian Registration Form is displayed by the
system.
3. Personal details are entered, and the relationship type
```
(Parent or Legal Guardian) is selected.
```
4. The database is checked by the system for any existing
accounts with the same details.
5. The required document is uploaded:
● Birth Certificate for Parent
● Legal Guardian Certificate for Legal Guardian
6. The registration request is submitted.
7. The registration is saved by the system with a Pending
status, and the Registrar is notified.
8. The submitted details and uploaded documents are
reviewed and verified by the Registrar.
9. Upon approval, the guardian account is activated by the
system, and the guardian is notified.
Alternative Flow Duplicate Account Detected:
1. The same personal details that already exist are entered by
the guardian.
2. The duplicate account is detected by the system.
3. A message indicating that the guardian is already registered
is displayed to the user.
Invalid document by guardian:
1. During document verification, the submitted document is
identified as invalid or does not match the declared
relationship.
2. The registration request is rejected.
3. The guardian is notified by the system of the rejection, the
reason is provided, and information about the remaining
two correction attempts is displayed.
4. The registration status is set to Pending Correction
Required.
Exit Condition The user account is successfully created and stored in the system.
Quality Requirements ● Secure password hashing
● Input validation for all registration fields
● Protection against duplicate accounts
Table 2.11 Use Case Description for Guardian Registration Use Case
CHAPTER 2 - REQUIREMENT ANALYSIS
32
ID UC 02
Use case Name User Login
Goal To authenticate registered users and grant access based on
assigned roles.
Participating Actors Director, Teacher, Guardian
Entry Condition A registered user account exists, and the login page of the system
is displayed.
Flow of Events 1. The username and password are entered.
2. The entered credentials are verified by the system.
3. The user role is identified by the system.
4. The user is redirected by the system to the role-based
dashboard.
Alternative Flow Invalid credentials:
If the entered credentials are invalid, an error message is displayed
by the system, and the user is requested to re-enter the correct
login details.
Exit Condition The user is authenticated and granted access according to their
role.
Quality Requirements ● Secure authentication mechanism
● Role-based access control
● Session management and timeout handling
Table 2.12 Use Case Description for User Login Use Case
ID UC 03
Use case Name Manage User Profile
Goal To allow users to view and update their personal profile information.
Participating Actors Director, Teacher, Guardian
Entry Condition The user is logged into the system.
Flow of Events 1. The profile management section is accessed by the user.
2. The current profile information is displayed by the system.
3. The phone number, address, email, and password are
updated.
4. The updated information is validated by the system.
5. The changes are saved by the system.
Alternative Flow Invalid data entry:
If invalid data is entered, an error message is displayed by the
system, and correction is requested
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
33
Exit Condition User profile information is successfully updated.
Quality Requirements ● Data integrity and validation
● Secure password update mechanism
Table 2.13 Use Case Description for Manage User Profile Use Case
ID UC 04
Use case Name Student Pickup Authorization
Goal To verify a guardian’s identity and authorize student pickup
Participating Actors Guardian, Teacher
Entry Condition The ID is presented at the school by the guardian.
Flow of Events 1. The ID is presented to the teacher by the guardian.
2. The guardian’s ID is entered into the system by the teacher.
3. The registered details of the guardian are retrieved and
displayed by the system.
4. The displayed information is verified by the teacher.
5. The student pick-up form is marked as completed by the
teacher.
6. Permission to take the student is granted to the guardian.
7. The action is logged by the system.
Alternative Flow Pickup Rejected:
1. Guardian information that does not match the person
presenting the ID is retrieved by the system.
2. The mismatch is identified by the teacher during verification.
3. The pickup request is marked as unauthorized by the teacher.
4. The incident is recorded as an ID mismatch in the system
log.
5. Permission to take the student is denied, and the pickup
process is terminated.
```
Exit Condition The pickup request status (approved or rejected) is recorded and
```
communicated.
Quality Requirements ● Secure identity verification
● Accurate audit trail
Table 2.14 Use Case Description for Student Pickup Authorization Use Case
ID UC 05
Use case Name Student Pickup Request Form
Goal To allow a guardian to authorize another person to pick up a student
CHAPTER 2 - REQUIREMENT ANALYSIS
34
and enable any teacher to manually verify the person’s national ID
before releasing the student.
Participating Actors Guardian, Teacher, Authorized Person
Entry Condition Guardians and teachers are logged into the system.
Flow of Events 1. The Student Pickup Request Form on the dashboard is
opened by the guardian.
2. The authorized person’s details (full name, relationship,
```
phone number, national ID) are entered.
```
3. The request is submitted by the guardian.
4. The information is validated by the system, the authorized
person is linked to the student, and the request is displayed
on the teacher's dashboard.
5. On the pickup day, the physical national ID is presented at
the school by the authorized person.
6. The presented ID is verified against the pickup request
displayed on the dashboard by the teacher.
7. If the ID matches, the request is approved by the teacher.
8. The student is released to the authorized person.
9. The successful release is recorded by the system.
Alternative Flow ID Mismatch or Invalid Authorization:
1. If the presented national ID does not match the authorized
person’s details in the system, the pickup request is rejected
by the teacher.
2. The rejection and the reason are recorded in the pickup log
by the system.
3. The student is not released, and the guardian is notified of
the failed pickup attempt by the system.
Exit Condition The pickup request is either approved, and the student is safely
released to the authorized person, or rejected and recorded in the
system.
Quality Requirements ● Secure identity verification
● Accurate audit trail
Table 2.15 Use Case Description for Student Pickup Request Form Use Case
ID UC 06
Use case Name Internal Messaging
Goal To enable secure communication between teachers and guardians.
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
35
Participating Actors Home Room teacher, Guardian
Entry Condition User is logged into the system
Flow of Events 1. A recipient is selected by the user.
2. The message is composed and sent.
3. The message is delivered and stored by the system.
Exit Condition The message is successfully sent and recorded.
Quality Requirements ● Message confidentiality
● Reliable delivery
Table 2.16 Use Case Description for Internal Messaging Use Case
ID UC 07
Use case Name Notification Management
Goal Allow authorized users to create, send, and view notifications
Participating Actors Director, Registrar's Office
Entry Condition User is logged into the system
Flow of Events 1. The Create Notification option is selected by the authorized
user.
2. The notification form is displayed by the system.
3. The title, content, and recipient are entered.
4. The notification is submitted by the user.
5. The notification is sent, delivery is confirmed, and the details
are logged by the system.
Alternative Flow Failed Delivery:
1. If the notification fails to be sent (e.g., due to a network
```
error), the sender is notified of the failure by the system.
```
2. The message is stored as Pending in the notification log by
the system.
Exit Condition Notification is sent and logged for future reference.
Quality Requirements ● Notifications must be delivered promptly
● complete audit trail.
Table 2.17 Use Case Description for Notification Management Use Case
ID UC 08
Use case Name Event Management
Goal To allow the school director to manage school events and for
guardians to view relevant events.
CHAPTER 2 - REQUIREMENT ANALYSIS
36
Participating Actors Director, Guardian
Entry Condition User is logged into the system
Flow of Events 1. The Manage Events option is selected by the School director.
2. The Event Management Interface is displayed by the system.
3. An event (e.g., exams, meetings, school activities) is added,
updated, or deleted by the administrator.
4. The changes are saved, and the Event Dashboard is updated
by the system.
5. The Event is accessed by the guardian.
6. All events are displayed by the system.
Alternative Flow Event Conflict:
If a new event conflicts with existing events, the authorized user is
notified by the system to resolve the conflict.
```
Exit Condition The event calendar is updated or displayed (for guardians).
```
Quality Requirements ● Accurate and up-to-date event information
● User-friendly display and management interface
Table 2.18 Event Management Use Case
ID UC 09
Use case Name Homework Communication Management
Goal To facilitate communication between teachers and guardians
regarding homework and homework-specific feedback.
Participating Actors Teacher, Guardian
Entry Condition User is logged into the system
Flow of Events 1. Homework details for a student, including subjects,
```
instructions, and guidance (e.g., “Your child has maths
```
```
homework. Please help them complete it”), are added by the
```
teacher.
2. The homework is viewed by the guardian in the Homework
Dashboard.
3. The guardian optionally adds a comment or feedback after
assisting their child.
4. The homework is automatically marked as seen, and the
viewing is logged by the system regardless of the feedback.
Alternative Flow No Homework Available:
If no homework has been added by the teacher for the student, a
message indicating that no homework is available is displayed to the
guardian.
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
37
Guardian Does Not Submit Feedback:
If the guardian chooses not to add any comment or feedback, the
homework is still marked as seen, and the viewing is logged by the
system.
Exit Condition Homework status is recorded.
Quality Requirements ● Accurate tracking
● Data consistency
Table 2.19 Use Case Description for Homework Communication Management Use Case
ID UC 10
Use case Name Report Card Viewing
Goal To share and view student academic performance.
Participating Actors School Director, Home Room Teacher, Guardian
Entry Condition Student records exist.
Flow of Events 1. Report card data, including subjects and results, is entered by
the homeroom teacher.
2. The entered data is stored by the system for viewing by the
guardian.
3. The report card submission timestamp is recorded by the
system to allow the guardian to request corrections from the
homeroom teacher if necessary.
4. The report card is reviewed and approved by the director.
5. Statistical analysis of academic performance is prepared by
the system at the end of the academic year to show student
progress differences between the first and second semesters.
6. The approved report card and statistical analysis are made
available to the guardian for viewing.
Alternative Flow Guardian Requests Corrections:
1. Corrections are requested through direct messaging to the
homeroom teacher after viewing the submitted report card.
2. The report card is unlocked by the system for editing.
3. The required corrections are made by the homeroom teacher.
4. The revised report card is approved by the director for
guardian viewing.
Exit Condition Homework status is recorded.
Quality Requirements ● Accurate tracking
● Data consistency
Table 2.20 Use Case Description for Report Card Viewing Use Case
CHAPTER 2 - REQUIREMENT ANALYSIS
38
2.6.3. Object Model
2.6.3.1. Data Dictionary
```
The Data Dictionary provides a detailed description of the data structures (tables) used in
```
```
the database implementation (MySQL). Below are the definitions of the attributes for the
```
major objects identified in the system.
2.6.3.2. Class Modelling
Attribute Data Type Constraints Description
user_id INT PK Unique identifier for the user.
```
email VARCHAR(100) UNIQUE,
```
NOT
NULL
```
User’s email address(Login ID) must be
```
unique
```
password_hash VARCHAR(255) NOT
```
NULL
Bycrypt hashed password.
role ENUM NOT
NULL
Role of user: ’ registrar Office’,’
Teacher’,’ Guardian’,’ home room
teacher’,’ director’.
```
full_name VARCHAR(100) NOT
```
NULL
Full name of the user.
created_at DATETIME NOT
NULL
Timestamp of an account creation.
```
phone_no VARCHAR(15) NOT
```
NULL
User’s contact number.
```
address VARCHAR(255) NOT
```
NULL
User residential address.
```
profile_image VARCHAR(255) NOT
```
NULL
Path to profile picture.
Table 2.21 Attributes of the User class
Attribute Data Type Constraints Description
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
39
registration_id INT PK Unique registration ID.
```
user_id INT FK(Ref users),NOT
```
NULL
Guardian user.
relationship_type ENUM NOT NULL Relationship to student.
```
document_path VARCHAR(2
```
```
55)
```
NOT NULL Uploaded verification
document.
status ENUM 'Pending',
'Approved’,
'Rejected',
'Correction
Required',
NOT NULL
Registration status.
rejection_reason TEXT NOT NULL Reason for rejection.
```
reviewed_by INT(FK) FK(Ref users),NOT
```
NULL
Registrar ID who reviewed.
reviewed_at DATETIME NOT NULL Timestamp of review.
created_at DATETIME NOT NULL Timestamp of account creation.
Table 2.22 Attributes of the GuardianRegistration class
Attribute Data Type Constraints Description
student_id INT PK Unique identifier for the student.
```
guardian_id INT FK(ref users),
```
NOT NULL
```
Reference to the Guardian(users table).
```
class_id INT PK Reference to the assigned classroom.
```
full_name VARCHAR(10
```
```
0)
```
NOT NULL Student’s full legal name.
CHAPTER 2 - REQUIREMENT ANALYSIS
40
dob DATE NOT NULL Date of birth.
emergency_c
ontact
```
VARCHAR(10
```
```
0)
```
NOT NULL Emergency contact info.
Table 2.23 Attributes of the Student class
Attribute Data Type Constraints Description
class_id INT PK Unique identifier for the class.
```
teacher_id INT FK(Ref
```
```
users),NOT NULL
```
Reference to the assigned
Teacher.
```
class_level VARCHAR(20
```
```
)
```
```
NOT NULL Class level(‘KG1’)
```
```
homeroom_teacher_id INT FK(Ref teacher),
```
NOT NULL
Home room teacher assigned
for the class.
Table 2.24 Attributes of the Classroom class
Attribute Data Type Constraints Description
request_id INT PK Unique identifier for the request.
```
student_id INT FK(Ref users),
```
NOT NULL
The student is being picked up.
```
guardian_id INT FK(Ref users),
```
NOT NULL
The guardian requested pickup.
status ENUM ‘Pending’,’ Approved’,’
Rejected’,
NOT NULL
The status for pick-up requests.
Table 2.25 Attributes of the PickupRequest class
Attribute Data Type Constraints Description
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
41
message_id INT PK Unique identifier for the message.
```
sender_id INT(FK) FK(Ref users),
```
NOT NULL
User ID of the sender.
```
receiver_id INT FK(Ref users),
```
NOT NULL
User ID of the receiver.
content TEXT NOT NULL The body of the message.
sent_at DATETIME NOT NULL The time the message was sent.
Table 2.26 Attributes of the Message class
Attribute Data Type Constraints Description
notification_id INT PK Unique identifier for the notification.
```
Title VARCHAR(150) NOT NULL Notification title.
```
content TEXT NOT NULL Notification message.
priority ENUM NOT NULL ‘Normal’,’ Emergency’
```
sender_id INT FK(Ref users),
```
NOT NULL
```
Sender ID(Registrar or Director).
```
created_at DATETIME NOT NULL The time the notification was created.
```
recipient_group ENUM FK(Ref users),
```
NOT NULL
The receiver group.
Table 2.27 Attributes of the Notification class
Attribute Data Type Constraints Description
event_id INT PK Unique identifier for the event.
```
Title VARCHAR(150) NOT NULL Title of the event
```
event_date DATETIME NOT NULL Date and time of the event.
CHAPTER 2 - REQUIREMENT ANALYSIS
42
description TEXT NOT NULL Details about the event
```
created_by INT FK(Ref users),
```
NOT NULL
```
Links to the Director (User ID) who
```
created the event.
Table 2.28 Attributes of the Event class
Attribute Data Type Constraints Description
homework_id INT PK Unique identifier for the homework.
```
student_id INT FK(Ref users) The student the homework belongs
```
to.
```
teacher_id INT FK(Ref users) The teacher that gives homework.
```
```
subject VARCHAR(50) NOT NULL The name of the subject.
```
instructions TEXT NOT NULL Homework instruction.
Table 2.29 Attributes of the HomeworkInfo class
Attribute Data Type Constraints Description
reportcard_id INT PK Unique identifier for the report.
```
student_id INT FK(Ref users) The student the report belongs to.
```
```
Term VARCHAR(20
```
```
)
```
NOT NULL Academic term.
```
filled_by INT(FK) FK(Ref users) filled by home room teacher ID.
```
filled_at DATETIME NOT NULL Time the report card is filled.
status ENUM ‘Pending’,
‘Approved’,
‘Unlocked’
The status of the current Report
```
Card(editable or approved/not editable).
```
edit_timesta
mp
DATETIME NOT NULL The duration of the time the system is open
for the homeroom teacher to edit the report
card.
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
43
approved_at DATETIME NOT NULL The time the report card is approved by the
director.
Table 2.30 Attributes of the ReportCard class
Attribute Data Type Constraints Description
guardian_id INT PK Unique identifier for the guardian.
relationship_type ENUM NOT NULL Relationship to student.
Table 2.31 Attributes of the Guardian class
Attribute Data Type constraints Description
```
teacher_id INT PK,FK (Ref Users) Unique identifier for
```
the teacher.
```
subject VARCHAR(25) NOT NULL Subject name assigned
```
to teacher.
```
qualification VARCHAR(25) NULL Academic degree.
```
hire_date DATE NOT NULL The date the teacher
joined.
Table 2.32 Attributes of the Teacher class
Attribute Data Type Constraints Description
```
director_id INT PK,FK (Ref Users) Unique identifier for the
```
director.
Table 2.33 Attributes of the Director class
Attribute Data Type Constraints Description
```
homeroom_teacher_id INT PK,FK (Ref teacher), Unique identifier for the
```
CHAPTER 2 - REQUIREMENT ANALYSIS
44
NOT NULL home room teacher.
Table 2.34 Attributes of the HomeRoomTeacher class
Attribute Data Type Constraints Description
```
guardian_id INT PK,FK (Ref user),
```
NOT NULL
Unique identifier for the
guardian.
Table 2.35 Attributes of the GuardianPickup class
2.6.3.2. Class Modelling
Class modelling represents the static relationships between objects and their attributes,
operations, and associations in the system. Below is the UML Class Diagram for the
objects identified in the previous section.
Figure 2.2 Class Diagram
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
45
2.6.4. Dynamic Modeling
2.6.4.1 Sequence Diagrams
Figure 2. 3 Sequence Diagram for Guardian Registration use case
CHAPTER 2 - REQUIREMENT ANALYSIS
46
Figure 2.4 Sequence Diagram for User Login use case
Figure 2.5 Sequence Diagram for Manage User Profile use case
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
47
Figure 2.6 Sequence Diagram for Student Pickup Authorization use case
CHAPTER 2 - REQUIREMENT ANALYSIS
48
Figure 2.7 Sequence Diagram for Student Pickup Request Form use case
Figure 2.8 Sequence Diagram for Internal Messaging use case
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
49
Figure 2.9 Sequence Diagram for Notification Management use case
Figure 2.10 Sequence Diagram for Event Management use case
CHAPTER 2 - REQUIREMENT ANALYSIS
50
Figure 2.11 Sequence Diagram for Homework Communication Management use case
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
51
Figure 2.12 Sequence Diagram for Report Card Viewing use case
CHAPTER 2 - REQUIREMENT ANALYSIS
52
2.6.4.2. Activity Diagrams
Figure 2.13 Activity Diagram for Guardian Registration use case
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
53
Figure 2.14 Activity Diagram for Student Pickup Request Form use case
CHAPTER 2 - REQUIREMENT ANALYSIS
54
Figure 2.15 Activity Diagram for Homework Communication Management use case
2.6.5. User Interface
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
55
Figure 2.16 UI Design for Guardian Registration
Figure 2.17 UI Design for User Login
CHAPTER 2 - REQUIREMENT ANALYSIS
56
Figure 2.18 UI Design for Student Pick up Request Form
Figure 2.19 UI Design for Homework Page
57
CHAPTER 3 - SYSTEM DESIGN
3.1. Introduction
The purpose of the system design of the Digital Parent-School Communication System is to
provide a tangible architectural design of the system that facilitates secure, reliable, and
timely communication between kindergarten schools and guardians. The system will offer an
effective and safe central platform of instant communication between schools, guardians, and
teachers. The system bridges the communication gap by changing the traditional means of
communication, like handouts and information booklets, into technology-ready objects.
To realize this goal, a web-based architecture is designed in the form of a modular and
layered architecture. The architecture is broken into clearly defined subsystems that are
directly related to the functional requirements as represented in the requirement analysis.
These subsystems are the User Management Subsystem, Guardian Management Subsystem,
Communication Subsystem, Notification Management Subsystem, Event Management
Subsystem, Homework Management Subsystem, and Report Card Subsystem. Specific
responsibilities, like the registration and verification of guardians and the authorization of
student pickup, internal messaging, emergency notifications, checking homework, and
sharing report cards, are enclosed in each subsystem. This decomposition guarantees
maintainability, easy testing, and responsibility boundaries in the development team.
3.2. Current Software Architecture
The existing system the school has in managing the guardian information and verification,
communication, and data privacy is purely manual with no formal software architecture.
Current practice is based on the use of paper records and conventional means of
communication instead of being based on organized software elements.
In terms of software architecture, the existing system does not have the fundamental
components of a modern information system and the presentation layer, application logic
layer, and data storage layer.
3.3. Proposed Software Architecture
3.3.1. Overview
The suggested Digital Parent–School Communication System will utilize a three-tier client-
server architecture, which includes presentation, application, and data layers.This context, it
CHAPTER 3 - SYSTEM DESIGN
58
has been seen that there are seven rational subsystems, each of which is highly coherent and
less coupled to encourage clear responsibilities and effective interaction.
The presentation layer offers user interfaces to the guardians, teachers, and administrators,
which are designed with React to create responsive and interactive interfaces. The application
layer contains the business logic, defines authentication and role-based access control, and
also coordinates the interactions between subsystems. It uses Node.js to implement and
provides functionality as RESTful APIs. The data layer will handle the long-term storage of
information about users, guardians, messages, notifications, and students that was imported to
the application as a CSV file that the application layer is only authorized to access and
modify due to data integrity and security.
The choice of this architecture was due to its well-rounded flexibility, scalability, and low
infrastructure overhead compared to the microservices, which have high scalability but high
operational overhead. In this context, it has been seen that there are seven rational subsystems,
each of which is highly coherent and less coupled to encourage clear responsibilities and
effective interaction.
Figure 3.1 Three-Tier Architecture for the System
3.3.2. Subsystem Decomposition
```
The digital parent-school communication system is categorized into seven (7) subsystems
```
depending on the functionality to facilitate development, maintenance, and testing.
1. User Management Subsystem
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
59
● This subsystem will be the base of the whole platform. Its main task is to control user
identities and cryptic credentials and establish what users can see and do with the help
of role-based access control.
● By consolidating all security and identity activities here, the system will make sure
that vital information such as passwords and permission levels is controlled in a single
high-security area rather than being distributed all over the system.
```
● It is a requirement for all other components of the system; a user cannot send a
```
message, see a grade, or place a pickup without being authenticated.
2. Guardian Management Subsystem.
● The Guardian Management Subsystem is the one that handles the administrative
records related to guardians and authorized relationships between the guardians and
the students. It facilitates the registration, verification, activation, and maintenance of
guardian accounts.
● The subsystem will make sure that guardians are properly connected with their
authorized children and impose access controls to secure the safety and integrity of
the data of students. Any guardian data and relationship data is secured and handled
by all the necessary system security and validation requirements.
3. Communication Subsystem
● The communication module will aid the two-way interaction between the homeroom
teachers and the parents in a way that is active and two-way. It is meant to substitute
the insecure, unformatted means of communication with a safe, documented
communication space.
● Here all the interactive messaging logic is isolated in order to keep the system
responsive. This enables the system to receive a big number of messages without
compromising the performance of academic or administrative modules.
● It uses the User Management subsystem of identity and the Guardian Management
subsystem of allowing teachers to only send messages to the verified contacts of
students within their respective classes.
4. Notification Management subsystem
CHAPTER 3 - SYSTEM DESIGN
60
● It allows transmission of system-generated messages of authorized administrative
offices, namely the Director and Registrar, to specific recipients in one direction only.
It is programmed to relay any official school news via a centralized channel that is
controlled to provide a uniform and reliable channel of dissemination of messages.
● All logic of processing notifications is confined in this subsystem so that the scale of
delivery can be reliable. This allows message delivery in broadcast format to the high
recipient populations without interference or affecting interactive communication or
other system modules.
● It has a non-interactive communication mode, i.e., recipients cannot respond to
notifications. It keeps specific history logs on which it audits the notification issues,
giving a clear and verifiable account of the time it issued notifications and to whom it
sent the same.
5. Event Management Subsystem
● The Event Management Subsystem deals with the organization of events related to the
school and the creation of the updated event calendar. It helps in the establishment,
updating, erasing, and storing, as well as displaying, of events concerning school
fraternity.
● It gives the authorized users, especially the school director, the tools to control
activities of the school like examinations, meetings, and also activities. It makes sure
that the information about the events is properly entered and updated in the system.
● Also, it provides scheduled events to guardians via an easy-to-use calendar interface.
It also has simple validation, e.g., event conflict detection, which can be used to
ensure the stability and integrity of event schedules. Role-based permissions are used
to make sure that only authorized access to event management functions is granted.
6. Homework Management subsystem
● The Homework Management subsystem allows teachers to send daily updates on
homework to guardians. In case homework is given, the subject is given and
```
instructions are made clear by the teacher; in any other case, no notification is done.
```
This will keep the guardians updated on the homework duties of their child at all
times.
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
61
● As guardians, in case of assigned homework and their aid in the completion by the
child, they may give feedback to the teacher, thus being able to communicate about
the challenges or explanations.
7. Report Card Subsystem
● Student academic performance records are to be managed by Report Card
Management Subsystem. This involves filling, approval, and viewing of the report
card.
● The subsystem also offers the capability for authorized personnel to update student
subject results and the data accuracy and consistency. It justifies a process of
approving academic records prior to their official release to be viewed by guardians.
● Moreover, the subsystem will preserve the past academic information and create
aggregate performance data so that the annual progress could be analyzed. The role-
based access control will guarantee the confidentiality, integrity, and reliability of
academic records by supporting all report card information.
3.3.3. Hardware/Software Mapping
Hardware/software mapping describes mapping details how the large subsystems of the
Digital Parent-School Communication System proposed are assigned to physical hardware
and off-the-shelf software. It outlines the implementation procedure and the procedure that
entails deployment of the system and its availability to the users.
The system deployment is made to have three main devices, that is, the user device, the
application server, and the database server, which have their own functions to ensure that the
system operation is reliable, secure, and efficient. These components interact with each other
through the well-defined interfaces to deliver a responsive and harmonious user experience.
The user device will also be the access point to all the end users, who are directors, teachers,
and guardians. This device has the Web Client component that is accessible through a normal
web browser. The web client is implemented with Next.js and is associated with an intuitive
interface, which is responsive. Through this component, users can perform the following
```
actions: see the notifications, send messages, make pickup requests, see the information about
```
homework, and get academic reports. The web client communicates with the application
server via the HTTP/HTTPS requests and receives organized responses to present to the user.
CHAPTER 3 - SYSTEM DESIGN
62
The key processing unit of the system is the application server, which is utilized to host the
backend services that were developed with the aid of Node.js. It takes the request of the web
client and executes it with business logic, does role access control, and authenticates and
```
authorizes through the assistance of JSON Web Tokens (JWT). Delivery of messages,
```
notification, pickup authorization processing, and generation of reports are done by the
application server. The centralized system logic within the application server offers
consistency, scalability, and reliable functionality of all interactions with users.
All persistent data required in the system will be stored in the database server. It holds a
MySQL database with accounts of users, records of students and parents, messages, notices,
events, homework data, pickup authorization logs, and academic reports. The database server
is also connected to the application server, and access to sensitive information is not
authorized to unauthorized persons. This isolation enhances the data integrity and data
security as well as the data performance.
All these aspects result in a powerful and scalable deployment framework with user
interaction, business logic processing, and data management well-separated. This will enable
expansion in the future, maintenance will be more convenient, and the system will be capable
of meeting the needs of nursery and kindergarten schools without any failure.
Figure 3.2 Package Diagram
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
63
3.3.4. Persistent Data Management
The persistent data management determines the way in which the critical information is
stored, maintained, and accessed in the system. Under the Digital Parent-School
Communication System, it ensures that the necessary data in it is available, consistent, and
safe even at the time the application is closed or started. The ability is critical in ensuring
effective communication between parents and schools.
```
The system uses a relational database (MySQL) to store the data in a structured and
```
permanent way. The application layer provides only access to all database operations, thus
data integrity and security and restricted access. This encapsulation will ensure no one can
access it without permission and ensure that every operation can be traced and be consistent.
```
The system handles the persistent data on the accounts of users (teachers, administrators, and
```
```
guardians), guardian profiles attached to students, student information imported in CSV files,
```
communication messages between the teachers and guardians, and notification records
containing delivery logs.
The system is based on MySQL as a relational database management system in the storage of
persistent data, user accounts, guardian information, communication records, notifications,
and other associated objects. The backend layer is wrapped in the database access, and it is
written with the help of Node.js.
Any communication with the database is conducted via a data access layer of the Node.js
backend. The layer has special modules that are in charge of processing SQL commands with
```
a MySQL driver. These modules are in charge of create, read, update, and delete (CRUD)
```
operations and database connections.
The Next.js frontend is not connected to the database. Rather, it does communication with the
backend via RESTful APIs, and all database operations are done on behalf of the client. This
encapsulation provides separation of concerns, increases security through obscurity of
database credentials, and increases system maintainability and scalability.
E-R Diagram
The E-R diagram illustrates the relationships between these entities, providing a clear
overview of the data structure and management. This design supports the system’s objectives
of high data integrity, security, and accessibility, while enabling efficient communication,
notifications, and performance reporting.
CHAPTER 3 - SYSTEM DESIGN
64
Figure 3.3 E-R Diagram
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
65
3.3.5. Access Control and Security
3.3.5.1. Access Control
Access control and security define how users interact with the Digital Parent–School
Communication System and how sensitive information is protected from unauthorized access.
```
The system adopts a role-based access control (RBAC) model, where permissions are
```
assigned based on user roles. This ensures that users can only access system resources
relevant to their responsibilities.
System Function/Feature School
Director
Teacher Guardian Registrar’s
Office
User Registration
Approval
✖ ✖ ✖ ✔
User Login / Logout ✔ ✔ ✔ ✔
View & Update Own
Profile
✔ ✔ ✔ ✔
Verify Guardians ✖ ✖ ✖ ✔
```
Send Internal Messages ✖ ✔(home room
```
```
teacher only)
```
✔ ✖
Receive Internal
Messages
```
✖ ✔(home room
```
```
teacher only)
```
✔ ✖
Create Notifications ✔ ✖ ✖ ✔
Send Emergency Alerts ✔ ✖ ✖ ✖
View Notifications ✔ ✔ ✔ ✔
Manage Event ✔ ✖ ✖ ✖
View Event ✔ ✔ ✔ ✖
```
Fill Report card ✖ ✔(home room
```
```
teacher only)
```
✖ ✖
Approve Academic
```
Results(Report Card)
```
✔ ✖ ✖ ✔
CHAPTER 3 - SYSTEM DESIGN
66
```
View Report Card ✔ ✔ ✔(own child
```
```
only)
```
✖
Submit Correction
Feedback
```
✖ ✖ ✔(own child
```
```
only)
```
✖
```
Notify Homework (by
```
```
subject)
```
✖ ✔ ✖ ✖
Provide Homework
Feedback
✖ ✖ ✔ ✖
View Homework
Notification
✖ ✔ ✔ ✖
Approve Student Pickup ✖ ✔ ✖ ✖
Submit Pickup Request ✖ ✖ ✔ ✖
✔= Allowed ✖ = Not Allowed
Table 3.1 Access Privilege Table
3.3.5.2. Security Mechanisms
1. Authentication: The system has a requirement of all users authenticating with secure login
credentials before accessing the system. After an effective authentication, the system
```
determines the role of the user (e.g., director, registrar, teacher, or guardian) and only allows
```
the user to see the corresponding features and dashboard.
2. Access Control: There is a privileged user called the administrator who has the ability to
do anything with all devices in the network. The system has role-based access control so that
the user is restricted to only access the information and functions that are allowed by the role.
There is a restriction on the information that guardians can see and that of the staff members
that can be seen by the administration.
3. Password Management: The passwords of the users never appear in plaintext. Hashes are
taken on all passwords, and they are stored in the database, which decreases the chances of
credential compromise in case of the data breach.
4. Session Management: The system employs the application of the JSON Web Tokens (JWT)
to manage their sessions so that they can engage in stateless and secure communication
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
67
between client and server. Each request verifies tokens to guarantee session integrity as well
as prevent unauthorized access.
5. Audit and Data Integrity: The system logs critical actions like approving of accounts,
publishing of report cards, and changes of events. This assists in accountability and assists in
detecting unauthorized or suspicious activities.
3.3.6. Subsystem Services
The system is decomposed into several subsystems, each providing a specific set of services
to fulfill the communication and administrative needs of the school:
Subsystem Service Description
User Management Register Allows new users to create an
account in the system with validation
Login Enables existing users to access the
system securely.
Logout Provides users with the ability to log
out of the system when finished.
View Profile Allows users to view their personal
information.
Update Profile Enables users to update contact
details and passwords.
Guardian Management Guardian registered register guardians in the system.
Maintain Relationships Maintains the relationships between
students and their guardians.
Pickup Authorization Gives student pickup permissions and
authorizations with pickup request.
Communication Messaging Facilitates secure internal messaging
between teachers and guardians.
Message Logs Stores all interactions for traceability.
Notification Post announcement Allows authorized users to create
```
general announcements (exams,
```
CHAPTER 3 - SYSTEM DESIGN
68
```
Management meetings).
```
Emergency Alerts Sends high-priority emergency
notifications.
Notification Logs Maintains logs for delivery
confirmation and tracking.
Event Management Manage Events Provides centralized management of
school activities, exams, and
meetings.
Display Events Shows upcoming events to users.
Homework
Management
Add homework details Teachers add homework details,
including subject, instructions, and
```
due date. (Not “post” only informs
```
```
and assigns)
```
Track Homework Viewing Tracks which guardians have viewed
homework assignments. Teachers can
also see the tracking.
Homework Feedback Allows guardians to provide optional
feedback on homework.
Report Card Fill report card It enables teachers to fill out report
cards with students' results.
View report card Provides secure access for guardians
to view report cards.
Director Approval The director reviews and approves
results before guardians can view
them.
Statistical Analysis Offers basic analysis for teachers to
track student progress.
Table 3.2 Subsystem Service Description
3.4. Detailed Class Diagram
This section transitions the system out of the requirements analysis to the software design,
optimizing conceptual objects into tangible classes. In order to guarantee the security of the
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
69
system and its functionality, the design process was oriented at achieving three major
```
activities:
```
● Missing Attributes and Operations Identification: We went through all of the
```
subsystems to add technical attributes (e.g., password-hash, verification-status) and
```
```
operational operations (e.g., unlockForCorrection) needed to bring the use cases to
```
life.
● Visibility and Signatures Specification: We set the strict access control where
```
sensitive data was defined as private (-) and only the necessary interaction
```
```
mechanisms were publicized as public (). Every operation had precise data types and
```
parameters signatures.
● Specification of Contracts: To enforce data integrity we specified preconditions
```
(constraints needed prior to an action) and Post-conditions (guaranteed results) of all
```
important operations of the system.
The following diagrams illustrate the detailed design for each subsystem, incorporating these
rules to ensure a secure and maintainable architecture.
Figure 3.4 Detailed Class Diagram for User Management Subsystem
CHAPTER 3 - SYSTEM DESIGN
70
Figure 3.5 Detailed Class Diagram for Guardian Management Subsystem
Figure 3.6 Detailed Class Diagram for Homework Management Subsystem
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
71
Figure 3.7 Detailed Class Diagram for Event Management Subsystem
Figure 3.8 Detailed Class Diagram for Academic Performance & Report Card Subsystem
CHAPTER 3 - SYSTEM DESIGN
72
Figure 3.9 Detailed Class Diagram for Notification Management Subsystem
Figure 3.10 Detailed Class Diagram for Communication Subsystem
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
73
3.5. Packages
In order to make sure that the Digital Parent-School Communication System is scalable,
maintainable, and simple to understand, the system has been divided into a collection of clear
packages. Each package is associated with one of the major subsystems that were outlined
during the requirement analysis stage and with which they share functionalities and
responsibilities. Such a modular organization enhances the readability of codes, enables
parallel development, and facilitates maintenance and further enhancement.
The package structure is done in a layered and feature-based approach, with closely related
classes, components, and services being put together. The existence of dependencies between
packages is heavily monitored with an aim of minimizing the level of coupling and
facilitating reuse.
Overview of System Packages
1. User Management Package
```
Purpose: Does all the user account and authentication functions.
```
```
Responsibilities:
```
● User registration and login
```
● Access Control (Role-Based): School Director, Teacher, Guardian.
```
```
● Profile management (view/update)
```
```
● Password hashing and session handling (JWT).
```
```
Dependencies:
```
Relies on the Database and Security packages to persist and authenticate data, respectively.
Expected Usage:
The layout is used by all system users to access the system safely and control personal
account information.
2. Guardian Management Package.
```
Purpose: Maintains the guardian data and the child/ward data associated with this data.
```
```
Responsibilities:
```
● Workflow Guardian registration, verification, and approval.
CHAPTER 3 - SYSTEM DESIGN
74
● Modifying child associations and guardian profiles.
● Controlling access by guardians to homework, academic performance,
communication, and notification.
● Pickup authorization requests.
```
Dependencies:
```
Relies on user management to perform authentication and a database to store records.
Expected Usage:
The administrators operate guardians, and guardians operate their profiles and also can
authorize others to pick up the students.
3. Communication Package
```
Purpose: Favors internal communications between teachers and guardians.
```
```
Responsibilities:
```
● Sending and receiving of messages.
● Storage and retrieval of messages.
● Permission for authorized communication.
```
Dependencies:
```
Depends on user management and guardian management to validate the sender/receiver and a
database to store messages.
Expected Usage:
Communicated by teachers and guardians in a direct and traceable manner.
4. Notification Management Package.
```
Purpose: Deals with system-wide notifications and alerts.
```
```
Responsibilities:
```
● Production and delivery of notifications.
● Emergency alert handling
● Delivery tracking and logs of notification.
```
Dependencies:
```
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
75
Relies on user management and guardian management to identify recipients and
communication services to deliver in real time.
Expected Usage:
Administrators and the staff of the registrar use it to broadcast announcements and
emergencies.
5. Event Management Package
```
Purpose: Organizes the school events, schedules, and conflicts.
```
```
Responsibilities:
```
● Creation, update, and deletion of events.
● Showing future activities to parents.
```
● Event checking (conflict checking).
```
```
Dependencies:
```
Accesses database services and communicates with the notification management on
reminders.
Expected Usage:
Administrators are the ones who handle events, and guardians are the ones who are watching.
6. Homework Package
```
Purpose: Monitors homework and parental comments.
```
```
Responsibilities:
```
● Incorporating homework information by educators.
● Looking at homework by guardians.
● Monitoring the viewing of the homework by the guardians and recording the status.
● Gathering voluntary feedback or comments from guardians.
```
Dependencies:
```
Relying on Guardian Management to access and persist the database.
Expected Usage:
```
The teachers give the information on homework; the guardians monitor it and report.
```
CHAPTER 3 - SYSTEM DESIGN
76
7. Academic& Report Card Package
```
Purpose: Oversees the academic performance information and report dissemination.
```
```
Responsibilities:
```
● Incorporating/recording the academic performance of the student.
● Seeing school performance or making reports available to parents.
● Workflow Director approval of report cards.
● Student academic performance statistical analysis.
```
Dependencies:
```
Outsources child associations and database packages to Guardian Management.
Expected Usage:
The academic results are added by teachers, and the guardians can safely see the academic
results of their child.
8. Database/Persistence Package.
```
Purpose: Gives a centralized data storage and retrieval.
```
```
Responsibilities:
```
● CRUD operations
● Data integrity enforcement
● Transaction handling
```
Dependencies:
```
The given package is a basic one, and all the other packages use it.
Expected Usage:
```
Not reached out to by users; serves all backend modules.
```
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
77
Figure 3.11 Package Diagram
CHAPTER 3 - SYSTEM DESIGN
78
REFERENCES
1. Bruegge, B. and Dutoit, A. H., 2009. Object-oriented software engineering: Using UML,
patterns, and Java. 3rd ed. Boston: Prentice Hall.
2. Geeks for Geeks. (Nov 08, 2024) Three-Tier Client Server Architecture in Distributed
System, [Online] Available at: https://www.geeksforgeeks.org/three-tier-client-server
architecture-in-distributed-system/
3. IBM. (n.d.). What is three-tier architecture? Retrieved from
```
https://www.ibm.com/think/topics/three-tier-architecture
```
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
79
APPENDICES
Appendix A: Questions Raised During the Interview with the School Director
1. What is the current system in place for managing guardians' information?
2. How do you keep track of who is authorized to pick up students?
3. What is the process for verifying a guardian’s identity during pickup?
4. Do you use any software to manage communication with guardians, or is it manual?
5. What challenges do you currently face with managing guardianship records?
6. Have there been any incidents or mistakes involving unauthorized pickups or guardian
misunderstandings?
7. Is the current system prone to errors or delays? If so, how?
8. Are there any security concerns with the current system?
9. What type of information is currently collected about guardians?
10. How are guardian records updated, and who manages updating?
11. What is the process for notifying the school if someone other than the usual guardian will
pick up a student?
12. What improvements would you like to see in the current system?
Appendix B: Parent/Guardian Survey Questionnaire
1. What is your relationship to the student?
☐ Parent
☐ Guardian
2. How many children do you have enrolled in the school?
☐ One
☐ Two
☐ More than two
3. How does the school usually communicate important information to you?(Select all that apply)
☐ Communication book
☐ Phone call
☐ In-person
```
☐ Other (please specify)
```
4. How often do you receive updates about your child’s academic or behavioral progress?
☐ Very often
☐ Often
☐ Sometimes
☐ Rarely
CHAPTER 3 - SYSTEM DESIGN
80
☐ Never
5. How satisfied are you with the current communication method?
☐ Very satisfied
☐ Satisfied
☐ Neutral
☐ Dissatisfied
☐ Very dissatisfied
6. Have you ever experienced delayed or missed information from the school?
☐ Yes
☐ No
7. How confident are you that the school verifies authorized guardians during student pickup?
☐ Very confident
☐ Confident
☐ Neutral
☐ Not confident
☐ Not confident at all
8. Have you ever needed to authorize someone else to pick up your child temporarily?
☐ Yes
☐ No
9. If yes, how was this authorization communicated?
☐ Written note
☐ Phone call
☐ In-person
```
☐ Other (please specify)
```
10. Do you feel the current pickup process ensures your child’s safety?
☐ Yes
☐ No
☐ Not sure
11. Would you prefer a digital communication system (e.g., SMS or mobile notifications)?
☐ Yes
☐ No
☐ Not sure
12. Which features would you find most useful? (Select all that apply)
☐ SMS alerts
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
81
☐ Emergency notifications
☐ Homework updates
☐ Event announcements
☐ Secure pickup verification
☐ Academic performance updates
13. How comfortable are you using digital systems?
☐ Very comfortable
☐ Comfortable
☐ Neutral
☐ Uncomfortable
☐ Very uncomfortable
14. What challenges do you face with the current parent–school communication system?
15. What improvements would you like to see in the future system?
Appendix C: Teacher Survey Questionnaire
1. What is your role at the school?
☐ Home room teacher
☐ Subject teacher
2. How long have you worked at this school?
☐ Less than 1 year
☐ 1–3 years
☐ 4–6 years
☐ More than 6 years
3. How do you currently communicate with parents/guardians?
☐ Communication books
☐ Phone calls
☐ In-person meetings
```
☐ Other (please specify)
```
4. How effective is the current communication method?
☐ Very effective
☐ Effective
☐ Neutral
☐ Ineffective
☐ Very ineffective
5. How often do communication delays affect your work?
CHAPTER 3 - SYSTEM DESIGN
82
☐ Very often
☐ Often
☐ Sometimes
☐ Rarely
☐ Never
6. How is guardian authorization verified during student pickup?
☐ Staff familiarity
☐ Student identification card
☐ Paper records
```
☐ Other (please specify)
```
7. Do you feel the current system adequately prevents unauthorized pickups?
☐ Yes
☐ No
☐ Not sure
8. Have you experienced confusion regarding who is authorized to pick up a student?
☐ Yes
☐ No
9. How time-consuming is managing guardian and communication records?
☐ Very time-consuming
☐ Time-consuming
☐ Neutral
☐ Not time-consuming
☐ Not time-consuming at all
10. Have records ever been lost, damaged, or misplaced?
☐ Yes
☐ No
11. Would a digital communication and guardian management system improve your work
efficiency?
☐ Yes
☐ No
☐ Not sure
12. Which features would be most beneficial to you? (Select all that apply)
☐ Automated notifications
☐ Digital guardian verification
DIGITAL PARENT-SCHOOL COMMUNICATION SYSTEM
83
☐ Homework management
☐ Event management
13. What challenges do you face with the current system?
#### 14. What features would you recommend for a new digital system?