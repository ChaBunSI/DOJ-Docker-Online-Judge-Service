#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

# pip
from py_eureka_client import eureka_client

# tasks
from common.queue_manager import sqs_thread_exec

# literals
from settings import literals
eureka_client.init(
    eureka_server = f"{literals.EUREKA_SERVER}:{literals.EUREKA_PORT}",
    app_name = literals.INSTANCE_APP_NAME,
    instance_host=literals.INSTANCE_HOST,
    instance_port=literals.INSTANCE_PORT,
)
def main():
    sqs_thread_exec(["non-fifo-test"])
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
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
