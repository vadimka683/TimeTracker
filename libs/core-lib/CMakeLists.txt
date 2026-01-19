# Создаем библиотеку ядра
add_library(TimeTracker-core STATIC)

# Публичные заголовки
target_include_directories(TimeTracker-core
    PUBLIC
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
    $<INSTALL_INTERFACE:include>
)

# Исходники
target_sources(TimeTracker-core
    PRIVATE
    #src/core/TimeEntry.cpp
   # src/core/Project.cpp
    #src/core/Database.cpp
    #src/utils/ExportHelper.cpp
)

# Публичные заголовки для MOC
target_sources(TimeTracker-core
    PUBLIC
    FILE_SET HEADERS
    BASE_DIRS ${CMAKE_CURRENT_SOURCE_DIR}/include
    FILES
    include/TimeTracker/core/TimeEntry.hpp
    #include/TimeTracker/core/Project.hpp
    #include/TimeTracker/core/Database.hpp
    #include/TimeTracker/utils/ExportHelper.hpp
)

# Зависимости
target_link_libraries(TimeTracker-core
    PUBLIC
    Qt5::Core
    Qt5::Sql
)

# Свойства
target_compile_features(TimeTracker-core PUBLIC cxx_std_17)
set_target_properties(TimeTracker-core PROPERTIES
    VERSION ${PROJECT_VERSION}
    SOVERSION 1
)