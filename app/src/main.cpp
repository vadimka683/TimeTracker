#include <TimeTracker/ui/MainWindow.hpp>  // Из библиотеки!
#include <QApplication>

int main(int argc, char* argv[]) {
    QApplication app(argc, argv);

    TimeTracker::ui::MainWindow window;
    window.show();

    return app.exec();
}