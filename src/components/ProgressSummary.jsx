import React from 'react';

const ProgressSummary = ({ courses, completed }) => {
  const totalCourses = courses.length;
  const completedCount = completed.length;

  // 1. Calculate Available Count (All prerequisites are met AND course is not already completed)
  const availableCount = courses.filter(course => {
    if (completed.includes(course.id)) return false;
    return course.prerequisites.every(prereqId => completed.includes(prereqId));
  }).length;

  // 2. Calculate Locked Count (One or more prerequisites are missing AND course is not completed)
  const lockedCount = totalCourses - completedCount - availableCount;

  // 3. Calculate percentage for the progress bar
  const progressPercent = totalCourses > 0 ? Math.round((completedCount / totalCourses) * 100) : 0;

  return (
    <div className="card p-3 my-3 shadow-sm bg-body rounded">
      <div className="d-flex justify-content-start align-items-center gap-4 mb-2 fw-semibold">
        <span className="text-success">
          <strong className="fs-4">{completedCount}</strong> of {totalCourses} courses completed
        </span>
        <span className="text-primary">
          <strong className="fs-4">{availableCount}</strong> available
        </span>
        <span className="text-secondary">
          <strong className="fs-4">{lockedCount}</strong> locked
        </span>
      </div>

      {/* Bootstrap Progress Bar */}
      <div className="progress" style={{ height: '24px' }}>
        <div
          className="progress-bar bg-success text-white fw-bold"
          role="progressbar"
          style={{ width: `${progressPercent}%` }}
          aria-valuenow={progressPercent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progressPercent}%
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;
