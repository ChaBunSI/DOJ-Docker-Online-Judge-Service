#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


# tasks
from common.queue_manager import sqs_thread_exec
from common.redis_client import consumer_thread_exec
def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.settings")
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
        consumer_thread_exec()
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()