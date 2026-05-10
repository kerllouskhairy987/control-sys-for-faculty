/**
 * @desc    faculty status enums 
 * @details send status in params as number like this --> status ==> 1 --> status ==> active
 */
export enum FacultyStatus {
    Active = "Active",        // 1 
    Resined = "Resined",      // 2
    Retired = "Retired",      // 3
    Dismissed = "Dismissed"   // 4
}

/**
 * @desc    faculty degree enums
 */
export enum FacultyDegree {
    TeachingAssistant = "Teaching Assistant",
    AssistantLecturer = "Assistant Lecturer",
    Lecturer = "Lecturer",
    AssociateProfessor = "Associate Professor",
    Professor = "Professor"
}