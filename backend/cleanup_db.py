import os
import shutil

# Try to remove db.sqlite3
try:
    if os.path.exists('db.sqlite3'):
        os.remove('db.sqlite3')
        print("db.sqlite3 removed successfully")
except Exception as e:
    print(f"Error removing db.sqlite3: {e}")

# Try to remove migrations
apps = ['accounts', 'complaints']
for app in apps:
    mig_dir = f'{app}/migrations'
    if os.path.exists(mig_dir):
        for f in os.listdir(mig_dir):
            if f.startswith('0') and f.endswith('.py'):
                try:
                    os.remove(os.path.join(mig_dir, f))
                    print(f"Removed {f} from {app}")
                except Exception as e:
                    print(f"Error removing {f}: {e}")
