#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

# pip
import django

# tasks
from common.queue_manager import sqs_thread_exec
def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.settings")
    django.setup()
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
        
        
    if os.environ.get("RUN_MAIN", None) == "true" and "runserver" in sys.argv:
        sqs_thread_exec(["SubmissionDone.fifo"])
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
