cmake_minimum_required(VERSION 3.16)
project(TimeTracker VERSION 1.0.0 LANGUAGES CXX)

# УКАЗАТЬ VCPKG
set(CMAKE_TOOLCHAIN_FILE "D:/vcpkg/scripts/buildsystems/vcpkg.cmake" CACHE STRING "Vcpkg toolchain")
set(CMAKE_PREFIX_PATH "D:/vcpkg/installed/x64-windows" CACHE STRING "Qt path")

# Настройка Qt
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_INCLUDE_CURRENT_DIR ON)

# Поиск Qt
find_package(Qt5 REQUIRED COMPONENTS Core Widgets Sql)

# === СПИСОК БИБЛИОТЕК ===
set(TIMETRACKER_LIBS)

# 1. Core библиотека (ядро + БД)
if(EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/libs/core-lib/CMakeLists.txt")
    message(STATUS "Found core-lib, adding...")
    add_subdirectory(libs/core-lib)
    list(APPEND TIMETRACKER_LIBS TimeTracker-core)
else()
    message(WARNING "core-lib not found")
endif()

# 2. Models библиотека (Qt модели)
if(EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/libs/models-lib/CMakeLists.txt")
    message(STATUS "Found models-lib, adding...")
    add_subdirectory(libs/models-lib)
    list(APPEND TIMETRACKER_LIBS TimeTracker-models)
else()
    message(STATUS "models-lib not found, skipping...")
endif()

# 3. UI библиотека (окна, диалоги)
if(EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/libs/ui-lib/CMakeLists.txt")
    message(STATUS "Found ui-lib, adding...")
    add_subdirectory(libs/ui-lib)
    list(APPEND TIMETRACKER_LIBS TimeTracker-ui)
else()
    message(STATUS "ui-lib not found, skipping...")
endif()

# 4. Приложение
if(EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/app/CMakeLists.txt")
    message(STATUS "Found app, adding...")
    add_subdirectory(app)
else()
    message(FATAL_ERROR "app not found! Creating minimal app...")
endif()

# === ВКЛЮЧАЕМ EXPORT ТОЛЬКО ЕСЛИ ЕСТЬ БИБЛИОТЕКИ ===
if(TIMETRACKER_LIBS)
    message(STATUS "Exporting libraries: ${TIMETRACKER_LIBS}")
    
    # Экспорт библиотек
    export(TARGETS 
        ${TIMETRACKER_LIBS}
        FILE "${CMAKE_BINARY_DIR}/TimeTrackerTargets.cmake"
    )
    
    # Настройка установки (опционально)
    include(GNUInstallDirs)
    
    install(TARGETS 
        ${TIMETRACKER_LIBS}
        EXPORT TimeTrackerTargets
        ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR}
        LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
        RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
        INCLUDES DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}
    )
    
    install(EXPORT TimeTrackerTargets
        FILE TimeTrackerTargets.cmake
        NAMESPACE TimeTracker::
        DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/TimeTracker
    )
    
    # Установка заголовков
    foreach(lib ${TIMETRACKER_LIBS})
        get_target_property(header_dir ${lib} INTERFACE_INCLUDE_DIRECTORIES)
        if(header_dir)
            install(DIRECTORY ${header_dir}/
                DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}
                FILES_MATCHING PATTERN "*.hpp" PATTERN "*.h"
            )
        endif()
    endforeach()
    
else()
    message(WARNING "No libraries to export")
endif()

# Информация о проекте
message(STATUS "=====================================")
message(STATUS "TimeTracker Modular Project")
message(STATUS "Qt found: ${Qt5_FOUND}")
message(STATUS "Libraries: ${TIMETRACKER_LIBS}")
message(STATUS "=====================================")