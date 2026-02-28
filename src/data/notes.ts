/**
 * Static notes data for Vigyan Institute
 * Contains sample notes for different subjects and grades
 */

import { Note } from '../types/notes';

export const notesData: Note[] = [
  {
    id: '1',
    title: 'Physics: Mechanics Fundamentals',
    description: 'Complete notes on Newton\'s laws of motion, friction, and circular motion with solved examples.',
    fileName: 'physics-mechanics-fundamentals.pdf',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    subject: 'Physics',
    grade: 'Class 11',
    uploadDate: '2024-01-15',
    downloadCount: 234,
    tags: ['mechanics', 'newton-laws', 'motion']
  },
  {
    id: '2',
    title: 'Chemistry: Organic Compounds',
    description: 'Detailed study material on hydrocarbons, functional groups, and organic reactions.',
    fileName: 'chemistry-organic-compounds.pdf',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    subject: 'Chemistry',
    grade: 'Class 12',
    uploadDate: '2024-01-14',
    downloadCount: 189,
    tags: ['organic', 'hydrocarbons', 'reactions']
  },
  {
    id: '3',
    title: 'Mathematics: Calculus Basics',
    description: 'Introduction to differentiation and integration with practice problems and solutions.',
    fileName: 'mathematics-calculus-basics.pdf',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    subject: 'Mathematics',
    grade: 'Class 11',
    uploadDate: '2024-01-13',
    downloadCount: 312,
    tags: ['calculus', 'differentiation', 'integration']
  },
  {
    id: '4',
    title: 'Physics: Electromagnetic Induction',
    description: 'Comprehensive notes on Faraday\'s law, Lenz\'s law, and applications of electromagnetic induction.',
    fileName: 'physics-electromagnetic-induction.pdf',
    fileSize: '2.7 MB',
    fileType: 'PDF',
    subject: 'Physics',
    grade: 'Class 12',
    uploadDate: '2024-01-12',
    downloadCount: 156,
    tags: ['electromagnetism', 'faraday', 'induction']
  },
  {
    id: '5',
    title: 'Chemistry: Chemical Bonding',
    description: 'Visual explanations of ionic, covalent, and metallic bonds with molecular structures.',
    fileName: 'chemistry-chemical-bonding.pdf',
    fileSize: '2.2 MB',
    fileType: 'PDF',
    subject: 'Chemistry',
    grade: 'Class 11',
    uploadDate: '2024-01-11',
    downloadCount: 278,
    tags: ['bonding', 'molecules', 'structures']
  },
  {
    id: '6',
    title: 'Mathematics: Trigonometry',
    description: 'Complete trigonometric identities, formulas, and applications in problem solving.',
    fileName: 'mathematics-trigonometry.pdf',
    fileSize: '1.5 MB',
    fileType: 'PDF',
    subject: 'Mathematics',
    grade: 'Class 10',
    uploadDate: '2024-01-10',
    downloadCount: 423,
    tags: ['trigonometry', 'identities', 'formulas']
  },
  {
    id: '7',
    title: 'Physics: Thermodynamics',
    description: 'Study of heat, work, energy, and laws of thermodynamics with numerical problems.',
    fileName: 'physics-thermodynamics.pdf',
    fileSize: '2.9 MB',
    fileType: 'PDF',
    subject: 'Physics',
    grade: 'Class 11',
    uploadDate: '2024-01-09',
    downloadCount: 198,
    tags: ['thermodynamics', 'heat', 'energy']
  },
  {
    id: '8',
    title: 'Chemistry: Periodic Table',
    description: 'Detailed periodic table trends, properties, and exceptions with mnemonics.',
    fileName: 'chemistry-periodic-table.pdf',
    fileSize: '1.9 MB',
    fileType: 'PDF',
    subject: 'Chemistry',
    grade: 'Class 10',
    uploadDate: '2024-01-08',
    downloadCount: 367,
    tags: ['periodic-table', 'elements', 'trends']
  },
  {
    id: '9',
    title: 'Mathematics: Probability',
    description: 'Probability theory, conditional probability, and distributions with examples.',
    fileName: 'mathematics-probability.pdf',
    fileSize: '1.3 MB',
    fileType: 'PDF',
    subject: 'Mathematics',
    grade: 'Class 12',
    uploadDate: '2024-01-07',
    downloadCount: 245,
    tags: ['probability', 'statistics', 'distributions']
  },
  {
    id: '10',
    title: 'Physics: Wave Optics',
    description: 'Interference, diffraction, and polarization of light with ray diagrams.',
    fileName: 'physics-wave-optics.pdf',
    fileSize: '2.6 MB',
    fileType: 'PDF',
    subject: 'Physics',
    grade: 'Class 12',
    uploadDate: '2024-01-06',
    downloadCount: 167,
    tags: ['optics', 'waves', 'interference']
  },
  {
    id: '11',
    title: 'Chemistry: Acids and Bases',
    description: 'pH scale, acid-base theories, and buffer solutions with practical applications.',
    fileName: 'chemistry-acids-bases.pdf',
    fileSize: '2.1 MB',
    fileType: 'PDF',
    subject: 'Chemistry',
    grade: 'Class 11',
    uploadDate: '2024-01-05',
    downloadCount: 289,
    tags: ['acids', 'bases', 'ph-scale']
  },
  {
    id: '12',
    title: 'Mathematics: Coordinate Geometry',
    description: 'Straight lines, circles, and conic sections with analytical methods.',
    fileName: 'mathematics-coordinate-geometry.pdf',
    fileSize: '2.3 MB',
    fileType: 'PDF',
    subject: 'Mathematics',
    grade: 'Class 11',
    uploadDate: '2024-01-04',
    downloadCount: 334,
    tags: ['geometry', 'coordinates', 'conics']
  }
];

// Helper functions for notes data
export const getNotesBySubject = (subject: string): Note[] => {
  return notesData.filter(note => note.subject.toLowerCase() === subject.toLowerCase());
};

export const getNotesByGrade = (grade: string): Note[] => {
  return notesData.filter(note => note.grade.toLowerCase() === grade.toLowerCase());
};

export const getNotesByFileType = (fileType: 'PDF' | 'DOC' | 'DOCX'): Note[] => {
  return notesData.filter(note => note.fileType === fileType);
};

export const searchNotes = (query: string): Note[] => {
  const lowercaseQuery = query.toLowerCase();
  return notesData.filter(note => 
    note.title.toLowerCase().includes(lowercaseQuery) ||
    note.description.toLowerCase().includes(lowercaseQuery) ||
    note.subject.toLowerCase().includes(lowercaseQuery) ||
    note.grade.toLowerCase().includes(lowercaseQuery) ||
    note.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getUniqueSubjects = (): string[] => {
  return Array.from(new Set(notesData.map(note => note.subject)));
};

export const getUniqueGrades = (): string[] => {
  return Array.from(new Set(notesData.map(note => note.grade)));
};
