#pragma once
#include <QString>

namespace TimeTracker {
namespace core {

class TimeEntry {
public:
    TimeEntry() = default;
    QString toString() const { return "TimeEntry"; }
};

} // namespace core
} // namespace TimeTracker
