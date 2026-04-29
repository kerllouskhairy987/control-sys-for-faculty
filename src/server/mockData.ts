/**
 * Mock Data for Admin Dashboard
 * In-memory storage for students and professors
 */

import { Student, Professor, Program, StudentStatus } from '@/types';

/**
 * Available Programs
 */
export const PROGRAMS: Program[] = [
    { id: '1', name: 'Computer Science', code: 'CS' },
    { id: '2', name: 'Engineering', code: 'ENG' },
    { id: '3', name: 'Business Administration', code: 'BUS' },
    { id: '4', name: 'Law', code: 'LAW' },
    { id: '5', name: 'Medicine', code: 'MED' },
];

/**
 * Determine student status based on GPA
 */
export function determineStatus(gpa: number): StudentStatus {
    if (gpa >= 3.0) return 'Active';
    if (gpa >= 2.0) return 'Warning';
    return 'Dismissed';
}

/**
 * Generate random GPA
 */
function randomGPA(): number {
    return parseFloat((Math.random() * 4.0).toFixed(2));
}

/**
 * Initial Mock Students Data
 */
export const INITIAL_STUDENTS: Student[] = [
    {
        id: '1',
        userName: 'john_doe',
        email: 'john.doe@university.edu',
        password: 'SecurePass123!',
        phoneNumber: '1234567890',
        fullName: 'John Doe',
        academicNumber: 'STU-2024-001',
        nationalId: 'NAT-123456',
        programId: '1',
        gpa: 3.85,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '2',
        userName: 'jane_smith',
        email: 'jane.smith@university.edu',
        password: 'StrongPass456!',
        phoneNumber: '1234567891',
        fullName: 'Jane Smith',
        academicNumber: 'STU-2024-002',
        nationalId: 'NAT-123457',
        programId: '1',
        gpa: 2.5,
        status: 'Warning',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '3',
        userName: 'mike_wilson',
        email: 'mike.wilson@university.edu',
        password: 'Secure789!Pass',
        phoneNumber: '1234567892',
        fullName: 'Mike Wilson',
        academicNumber: 'STU-2024-003',
        nationalId: 'NAT-123458',
        programId: '2',
        gpa: 3.5,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '4',
        userName: 'sarah_johnson',
        email: 'sarah.johnson@university.edu',
        password: 'MyPass2024!@',
        phoneNumber: '1234567893',
        fullName: 'Sarah Johnson',
        academicNumber: 'STU-2024-004',
        nationalId: 'NAT-123459',
        programId: '1',
        gpa: 1.8,
        status: 'Dismissed',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '5',
        userName: 'alex_brown',
        email: 'alex.brown@university.edu',
        password: 'BrownPass#123',
        phoneNumber: '1234567894',
        fullName: 'Alex Brown',
        academicNumber: 'STU-2024-005',
        nationalId: 'NAT-123460',
        programId: '3',
        gpa: 3.2,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '6',
        userName: 'emma_davis',
        email: 'emma.davis@university.edu',
        password: 'DavisPass@456',
        phoneNumber: '1234567895',
        fullName: 'Emma Davis',
        academicNumber: 'STU-2024-006',
        nationalId: 'NAT-123461',
        programId: '4',
        gpa: 3.7,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '7',
        userName: 'chris_miller',
        email: 'chris.miller@university.edu',
        password: 'Miller@Pass789',
        phoneNumber: '1234567896',
        fullName: 'Chris Miller',
        academicNumber: 'STU-2024-007',
        nationalId: 'NAT-123462',
        programId: '2',
        gpa: 2.3,
        status: 'Warning',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '8',
        userName: 'lisa_taylor',
        email: 'lisa.taylor@university.edu',
        password: 'TaylorPass#999',
        phoneNumber: '1234567897',
        fullName: 'Lisa Taylor',
        academicNumber: 'STU-2024-008',
        nationalId: 'NAT-123463',
        programId: '1',
        gpa: 3.9,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '9',
        userName: 'robert_thomas',
        email: 'robert.thomas@university.edu',
        password: 'Thomas!Pass@123',
        phoneNumber: '1234567898',
        fullName: 'Robert Thomas',
        academicNumber: 'STU-2024-009',
        nationalId: 'NAT-123464',
        programId: '5',
        gpa: 2.1,
        status: 'Warning',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '10',
        userName: 'sophia_anderson',
        email: 'sophia.anderson@university.edu',
        password: 'AndersonPass!1',
        phoneNumber: '1234567899',
        fullName: 'Sophia Anderson',
        academicNumber: 'STU-2024-010',
        nationalId: 'NAT-123465',
        programId: '3',
        gpa: 3.6,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '11',
        userName: 'david_martin',
        email: 'david.martin@university.edu',
        password: 'Martin@Pass456',
        phoneNumber: '1234567900',
        fullName: 'David Martin',
        academicNumber: 'STU-2024-011',
        nationalId: 'NAT-123466',
        programId: '1',
        gpa: 3.1,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '12',
        userName: 'olivia_white',
        email: 'olivia.white@university.edu',
        password: 'WhitePass#789',
        phoneNumber: '1234567901',
        fullName: 'Olivia White',
        academicNumber: 'STU-2024-012',
        nationalId: 'NAT-123467',
        programId: '2',
        gpa: 1.9,
        status: 'Dismissed',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '13',
        userName: 'james_harris',
        email: 'james.harris@university.edu',
        password: 'HarrisPass@2024',
        phoneNumber: '1234567902',
        fullName: 'James Harris',
        academicNumber: 'STU-2024-013',
        nationalId: 'NAT-123468',
        programId: '4',
        gpa: 3.4,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '14',
        userName: 'isabella_clark',
        email: 'isabella.clark@university.edu',
        password: 'ClarkPass!123',
        phoneNumber: '1234567903',
        fullName: 'Isabella Clark',
        academicNumber: 'STU-2024-014',
        nationalId: 'NAT-123469',
        programId: '1',
        gpa: 2.6,
        status: 'Warning',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '15',
        userName: 'william_lewis',
        email: 'william.lewis@university.edu',
        password: 'LewisPass@789',
        phoneNumber: '1234567904',
        fullName: 'William Lewis',
        academicNumber: 'STU-2024-015',
        nationalId: 'NAT-123470',
        programId: '5',
        gpa: 3.8,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '16',
        userName: 'ava_walker',
        email: 'ava.walker@university.edu',
        password: 'WalkerPass#456',
        phoneNumber: '1234567905',
        fullName: 'Ava Walker',
        academicNumber: 'STU-2024-016',
        nationalId: 'NAT-123471',
        programId: '3',
        gpa: 3.3,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '17',
        userName: 'mason_hall',
        email: 'mason.hall@university.edu',
        password: 'HallPass@2024!',
        phoneNumber: '1234567906',
        fullName: 'Mason Hall',
        academicNumber: 'STU-2024-017',
        nationalId: 'NAT-123472',
        programId: '2',
        gpa: 2.0,
        status: 'Warning',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '18',
        userName: 'charlotte_green',
        email: 'charlotte.green@university.edu',
        password: 'GreenPass!789',
        phoneNumber: '1234567907',
        fullName: 'Charlotte Green',
        academicNumber: 'STU-2024-018',
        nationalId: 'NAT-123473',
        programId: '1',
        gpa: 3.95,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '19',
        userName: 'lucas_king',
        email: 'lucas.king@university.edu',
        password: 'KingPass@456!',
        phoneNumber: '1234567908',
        fullName: 'Lucas King',
        academicNumber: 'STU-2024-019',
        nationalId: 'NAT-123474',
        programId: '4',
        gpa: 1.7,
        status: 'Dismissed',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '20',
        userName: 'mia_wright',
        email: 'mia.wright@university.edu',
        password: 'WrightPass#111',
        phoneNumber: '1234567909',
        fullName: 'Mia Wright',
        academicNumber: 'STU-2024-020',
        nationalId: 'NAT-123475',
        programId: '5',
        gpa: 3.5,
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
];

/**
 * Mock Professors Data
 */
export const INITIAL_PROFESSORS: Professor[] = [
    {
        id: 'prof_1',
        userName: 'prof_smith',
        email: 'prof.smith@university.edu',
        password: 'ProfPass123!',
        phoneNumber: '5001234567',
        fullName: 'Dr. Robert Smith',
        nationalId: 'NAT-500001',
        departmentId: '1',
        specialization: 'Machine Learning',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: 'prof_2',
        userName: 'prof_johnson',
        email: 'prof.johnson@university.edu',
        password: 'ProfPass456!',
        phoneNumber: '5001234568',
        fullName: 'Dr. Emily Johnson',
        nationalId: 'NAT-500002',
        departmentId: '2',
        specialization: 'Structural Engineering',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: 'prof_3',
        userName: 'prof_williams',
        email: 'prof.williams@university.edu',
        password: 'ProfPass789!',
        phoneNumber: '5001234569',
        fullName: 'Prof. James Williams',
        nationalId: 'NAT-500003',
        departmentId: '3',
        specialization: 'Finance',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: 'prof_4',
        userName: 'prof_brown',
        email: 'prof.brown@university.edu',
        password: 'ProfPass012!',
        phoneNumber: '5001234570',
        fullName: 'Dr. Patricia Brown',
        nationalId: 'NAT-500004',
        departmentId: '4',
        specialization: 'Constitutional Law',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: 'prof_5',
        userName: 'prof_miller',
        email: 'prof.miller@university.edu',
        password: 'ProfPass345!',
        phoneNumber: '5001234571',
        fullName: 'Dr. Michael Miller',
        nationalId: 'NAT-500005',
        departmentId: '5',
        specialization: 'Surgery',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
];

/**
 * In-Memory Storage
 * In production, replace with actual database calls
 */
let students: Student[] = [...INITIAL_STUDENTS];
let professors: Professor[] = [...INITIAL_PROFESSORS];

/**
 * Student Storage Functions
 */
export function getStudents(): Student[] {
    return students;
}

export function addStudent(student: Student): void {
    students.push(student);
}

export function updateStudent(id: string, student: Partial<Student>): void {
    const index = students.findIndex((s) => s.id === id);
    if (index !== -1) {
        students[index] = { ...students[index], ...student, updatedAt: new Date() };
    }
}

export function deleteStudent(id: string): void {
    students = students.filter((s) => s.id !== id);
}

/**
 * Professor Storage Functions
 */
export function getProfessors(): Professor[] {
    return professors;
}

export function addProfessor(professor: Professor): void {
    professors.push(professor);
}

export function updateProfessor(id: string, professor: Partial<Professor>): void {
    const index = professors.findIndex((p) => p.id === id);
    if (index !== -1) {
        professors[index] = { ...professors[index], ...professor, updatedAt: new Date() };
    }
}

export function deleteProfessor(id: string): void {
    professors = professors.filter((p) => p.id !== id);
}

/**
 * Reset Data (for testing/development)
 */
export function resetData(): void {
    students = [...INITIAL_STUDENTS];
    professors = [...INITIAL_PROFESSORS];
}
