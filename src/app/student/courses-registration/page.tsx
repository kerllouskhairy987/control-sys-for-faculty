"use client";

import { useEffect, useState } from "react";
import { CourseCatalog, Course } from "@/components/student/course-catalog";
import { CircleAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import {
  getAvailableRegistrations,
  getStudentInformation,
  getRegistrationPeriod,
  registerCourse,
  getStudentRegistrations,
} from "@/server/studentServer/studentActions";
import toast from "react-hot-toast";

export default function CoursesRegistration() {
  const [catalog, setCatalog] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [registeredStatuses, setRegisteredStatuses] = useState<
    Record<string, string>
  >({});

  const [periodInfo, setPeriodInfo] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [maxCredits, setMaxCredits] = useState<number>(0);
  const [studentId, setStudentId] = useState<string | null>(null);

  const currentCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const periodResponse = await getRegistrationPeriod();

        if (!periodResponse || periodResponse.success === false) {
          setIsRegistrationOpen(false);
          setIsLoading(false);
          return;
        }

        const periodData = periodResponse.data || periodResponse;
        setPeriodInfo(periodData);

        const startDate = new Date(periodData.startDateUtc);
        const endDate = new Date(periodData.endDateUtc);
        const now = new Date();
        const isActive = periodData.isActive === true;
        const term = periodData.term;
        const year = periodData.year;

        if (isActive && now >= startDate && now <= endDate) {
          setIsRegistrationOpen(true);

          const studentInfo = await getStudentInformation();

          if (!studentInfo || studentInfo.success === false) {
            setError(studentInfo?.message || "Failed to load student identity");
            setIsLoading(false);
            return;
          }

          setStudentId(studentInfo.id);
          setMaxCredits(studentInfo.maxCreditsAllowed || 21);

          if (!term || !year) {
            setError("Could not determine current term and year.");
            setIsLoading(false);
            return;
          }

          const availableResponse = await getAvailableRegistrations(
            studentInfo.id,
            term,
            year,
          );

          const fetchedCourses: Course[] = Array.isArray(availableResponse)
            ? availableResponse
            : availableResponse?.data || availableResponse?.courses || [];

          setCatalog(fetchedCourses);

          const registrationsResponse = await getStudentRegistrations(
            studentInfo.id,
          );

          let regsArray = [];
          if (Array.isArray(registrationsResponse)) {
            regsArray = registrationsResponse;
          } else if (
            registrationsResponse?.data &&
            Array.isArray(registrationsResponse.data)
          ) {
            regsArray = registrationsResponse.data;
          }

          const initialStatuses: Record<string, string> = {};

          regsArray.forEach((reg: any) => {
            if (reg.courseOfferingId && reg.status) {
              initialStatuses[reg.courseOfferingId] = reg.status;
            }
          });

          const approvedAndPendingCourses = fetchedCourses.filter(
            (c) => initialStatuses[c.offeringId],
          );

          setRegisteredStatuses(initialStatuses);
          setSelectedCourses(approvedAndPendingCourses);
        } else {
          setIsRegistrationOpen(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistrationData();
  }, []);

  const handleAddCourse = async (course: Course) => {
    if (course.isFull) {
      toast.error("This course is fully booked.");
      return false;
    }

    if (currentCredits + course.credits > maxCredits) {
      toast.error(
        `Sorry, you reached the maximum credit load (${maxCredits} Cr.) for this semester.`,
      );
      return false;
    }

    if (!studentId) return false;

    const response = await registerCourse(studentId, course.offeringId);

    if (response.success) {
      toast.success(response.message || "Course registered successfully!");

      setSelectedCourses((prev) => [...prev, course]);
      setRegisteredStatuses((prev) => ({
        ...prev,
        [course.offeringId]: "JustAdded",
      }));

      setTimeout(async () => {
        const freshRegs = await getStudentRegistrations(studentId);
        let freshArray = [];
        if (Array.isArray(freshRegs)) {
          freshArray = freshRegs;
        } else if (freshRegs?.data && Array.isArray(freshRegs.data)) {
          freshArray = freshRegs.data;
        }

        const updatedStatuses: Record<string, string> = {};
        freshArray.forEach((reg: any) => {
          if (reg.courseOfferingId && reg.status) {
            updatedStatuses[reg.courseOfferingId] = reg.status;
          }
        });

        setRegisteredStatuses((prev) => ({
          ...prev,
          ...updatedStatuses,
        }));
      }, 2500);

      return true;
    } else {
      toast.error(response.message || "Failed to register course.");
      return false;
    }
  };

  return (
    <div className="p-4 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Courses Registration
        </h1>
        <p className="text-muted-foreground">
          Select your courses for the current semester.
        </p>
      </div>

      {/* 1. Skeleton Loading State */}
      {isLoading && (
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            <Skeleton className="h-[52px] w-full rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[140px] w-full rounded-xl" />
              ))}
            </div>
          </div>
          <Skeleton className="w-full lg:w-1/3 h-[250px] rounded-xl shrink-0" />
        </div>
      )}

      {/* 2. Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800 font-medium">Error</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* 3. Main Content */}
      {!isLoading && !error && (
        <div className="flex w-full flex-col lg:flex-row gap-4 animate-in slide-in-from-bottom-4 duration-700">
          <div className="flex-1">
            {isRegistrationOpen ? (
              <>
                {catalog.length > 0 ? (
                  <CourseCatalog
                    catalog={catalog}
                    registeredStatuses={registeredStatuses}
                    onAddCourse={handleAddCourse}
                    periodInfo={periodInfo}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed border-muted rounded-xl bg-muted/10">
                    <CircleAlert className="w-8 h-8 opacity-50 mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-1">
                      No Courses Available
                    </h3>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed border-muted rounded-xl bg-muted/10">
                <CircleAlert className="w-8 h-8 opacity-50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">
                  Registration Is Closed
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}