export function randomDocuments(): Array<any> {
  let documents = [
    {
      id: 1,
      name: 'Introduction to Computer Science',
      description:
        'An introductory course covering the fundamental concepts of computer science, including algorithms, data structures, and programming languages.',
      url: 'https://example.com/intro-to-cs',
    },
    {
      id: 2,
      name: 'Data Structures and Algorithms',
      description:
        'This course explores advanced data structures and algorithms used in computer science, focusing on topics like graphs, trees, sorting, and searching algorithms.',
      url: 'https://example.com/data-structures-algorithms',
    },
    {
      id: 3,
      name: 'Database Systems',
      description:
        'A comprehensive study of database management systems, covering topics such as relational database design, SQL querying, and transaction management.',
      url: 'https://example.com/database-systems',
    },
    {
      id: 4,
      name: 'Web Development',
      description:
        'This class provides hands-on experience in developing dynamic websites and web applications, including front-end technologies like HTML, CSS, and JavaScript, as well as back-end frameworks.',
      url: 'https://example.com/web-development',
    },
    {
      id: 5,
      name: 'Artificial Intelligence',
      description:
        'An exploration of artificial intelligence techniques, including machine learning, neural networks, natural language processing, and intelligent agents.',
      url: 'https://example.com/artificial-intelligence',
    },
  ];

  return documents;
}

//the structure of each document from the backend
export interface fetchedDocument {
  id: number;
  name: string;
  description: string;
  url: string;
}
